import { put, takeLeading, all, select, delay } from 'redux-saga/effects'
// import { takeEvery takeLatest  } from 'redux-saga/effects'
import request from 'request-promise'

function* refreshPatientList() {
  const patientLEK = yield select((state) => state.patientLEK)

  if (patientLEK === 'START' || patientLEK) {
    const { patients, lastEvaluatedKey } = yield callGetPatients({ exclusiveStartKey: patientLEK })
    console.log('API called. Response body: ')
    console.log({ patients, lastEvaluatedKey })
    yield all([
      put({
        type: 'GET_PAGINATED_PATIENTS_SUCESS',
        payload: patients,
      }),
      put({
        type: 'SET_LEK',
        payload: lastEvaluatedKey,
      })
    ])
    yield delay(800)
    
    yield refreshPatientList()
  }
}

function* refeshPartPatientList() {
  const patientLEK = yield select((state) => state.patientLEK)
  if (!patientLEK || patientLEK === 'START') console.log('API called without query string')
  else console.log(`API called with query stirng ?exclusiveStartKey=${patientLEK}`)

  let exclusiveStartKey = patientLEK === 'START' ? undefined : patientLEK
  
  const { patients, lastEvaluatedKey } = yield callGetPatients({ exclusiveStartKey })

  console.log('Response body:')
  console.log({ patients, lastEvaluatedKey })

  yield all([
    put({
      type: 'GET_PAGINATED_PATIENTS_SUCESS',
      payload: patients,
    }),
    put({
      type: 'SET_LEK',
      payload: lastEvaluatedKey,
    })
  ])
}

async function callGetPatients({ exclusiveStartKey }) {
  return request
    .get({
      url: "http://localhost:8000/patients",
      qs: { exclusiveStartKey },
      json: true,
    })
}

// function* test() {
//   const autoFetch = yield select((state) => state.autoFetch)
//   console.log(autoFetch)
  
//   if (autoFetch) {
//     console.log('REFRESH_PATIENT_LIST')
//     yield put({ type: 'REFRESH_PATIENT_LIST' })
//     yield delay(5000)
//     console.log('after 5 sec')

//     console.log('before calling test')
//     yield test()
//     console.log('after calling test')
//   }
// }

// function* watchAutoFetch() {
//   yield takeLatest('START_AUTOFETCH', test)
//   // yield takeLatest('STOP_AUTOFETCH', test)
// }


function* rootSaga() {
  console.log('rootSaga')
  yield all([
    yield takeLeading('REFRESH_PATIENT_LIST', refreshPatientList),
    yield takeLeading('REFRESH_PART_PATIENT_LIST', refeshPartPatientList),
    // watchAutoFetch(),
  ])
}

export default rootSaga