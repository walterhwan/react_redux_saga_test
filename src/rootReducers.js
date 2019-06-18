import { combineReducers } from 'redux';
import _ from 'lodash';

function patients(state = [], action) {
  let arr;
  switch (action.type) {
    case 'GET_PAGINATED_PATIENTS_SUCESS':
      arr = action.payload.concat(state);
      return _.chain(arr)
        .uniqBy('patientId')
        .orderBy(['onboarding', 'dateOfLastLog'], ['desc', 'asc'])
        .value();
    case 'GET_PAGINATED_PATIENTS_FAILURE':
      console.log(action.error);
      return state;
    case 'CLEAR_PATIENTS':
      return [];
    default:
      return state;
  }
}

function patientLEK(state = '', action) {
  switch (action.type) {
    case 'SET_LEK':
      return action.payload || '';
    case 'CLEAR_LEK':
      return '';
    default:
      return state;
  }
}

function items(state = [], action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.payload  
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
  items,
  // autoFetch,
});

export default rootRecuders;
