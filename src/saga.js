import {
  put,
  take,
  fork,
  cancel,
  cancelled,
  takeLeading,
  takeLatest,
  all,
  select,
  delay,
  call,
} from 'redux-saga/effects';
import request from 'request-promise';

function callGetPatients({ exclusiveStartKey }) {
  return request
    .get({
      url: 'http://localhost:8000/patients',
      qs: { exclusiveStartKey },
      json: true,
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function* getPaginatedPatients() {
  const patientLEK = yield select(state => state.patientLEK);

  // // log
  // if (!patientLEK) {
  //   console.log('API called without query string');
  // } else {
  //   console.log(
  //     `API called with query stirng ?exclusiveStartKey=${patientLEK}`
  //   );
  // }

  let exclusiveStartKey = patientLEK === '' ? undefined : patientLEK;

  const { response, error } = yield call(callGetPatients, {
    exclusiveStartKey,
  });

  if (error) {
    put({
      type: 'GET_PAGINATED_PATIENTS_FAILURE',
      error: error,
    });
  } else {
    const { patients, lastEvaluatedKey } = response;

    // // log
    // console.log('Response body:');
    // console.log({ patients, lastEvaluatedKey });

    yield all([
      put({
        type: 'GET_PAGINATED_PATIENTS_SUCESS',
        payload: patients,
      }),
      put({
        type: 'SET_LEK',
        payload: lastEvaluatedKey,
      }),
    ]);
  }
}

function* syncPatients() {
  try {
    let patientLEK;
    do {
      yield getPaginatedPatients();
      yield delay(1000);
      patientLEK = yield select(state => state.patientLEK);
    } while (patientLEK);
  } finally {
    if (yield cancelled()) {
      console.log('manually canceled');
    }
  }
}

function* refreshPatients() {
  yield put({
    type: 'CLEAR_LEK',
  });

  const syncTask = yield fork(syncPatients);

  yield take('CANCEL_GET_PATIENTS_REQUEST');

  yield cancel(syncTask);

  // do {
  //   yield getPaginatedPatients();
  //   yield delay(400);
  //   patientLEK = yield select(state => state.patientLEK);
  // } while (patientLEK);
}

function* rootSaga() {
  yield all([
    yield takeLeading('GET_PAGINATED_PATIENTS_REQUEST', getPaginatedPatients),
    yield takeLeading('GET_PAGINATED_PATIENTS_FAILURE', getPaginatedPatients),
    yield takeLatest('GET_PATIENTS_REQUEST', refreshPatients),
  ]);
}

export default rootSaga;
