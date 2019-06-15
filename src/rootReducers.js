import { combineReducers } from 'redux';
import _ from 'lodash';

function patients(state = [], action) {
  const arr = action.payload.concat(state);
  switch (action.type) {
    case 'GET_PAGINATED_PATIENTS_SUCESS':
      return _.chain(arr)
        .uniqBy('patientId')
        .orderBy(['onboarding', 'dateOfLastLog'], ['desc', 'asc'])
        .value();
    case 'CLEAR_PATIENTS':
      return [];
    default:
      return state;
  }
}

function patientLEK(state = 'START', action) {
  switch (action.type) {
    case 'SET_LEK':
      return action.payload || null;
    default:
      return state;
  }
}

// function autoFetch(state = true, action) {
//   switch (action.type) {
//     case 'STOP_AUTOFETCH':
//       return false
//     case 'START_AUTOFETCH':
//       return true
//     default:
//       return state
//   }
// }

// function counter(state = 0, action) {
//   switch (action.type) {
//     case 'INCREASE_COUNTER':
//       return state + 1
//     default:
//       return state
//   }
// }

// function counterRunningState(state = 'STOPPED', action) {
//   switch (action.type) {
//     case 'STOP_COUNTER':
//       return 'STOPPED'
//     case 'START_COUNTER':
//       return 'RUNNING'
//     default:
//       return state
//   }
// }

const rootRecuders = combineReducers({
  patients,
  patientLEK,
  // autoFetch,
});

export default rootRecuders;
