import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import QRCode from 'qrcode.react';

import "./App.css";

// const assessmentLink = 'https://dev.portal.trayt.io/assessments/vt0SphMZorAeqF2TBuJBUMpWuZ4WCyPNyuQjbRHt9SeaLCtJx7RNMKbQ6F059YjZ479PpHJaqchNvhDCoCfbUj5oK6S2tPrXvyJMK8EAWteK72vewPR8rbJFdNX7Gu2FGrWzL25SE7GTXN3K0fHFTLwmLWRD05oAAVpC5pTCF2uor4fJD1R5wfMsZfJSKBx1mn5CWx4UGAqj5MjByDbfhwSWGbYCjBrSjZwFHuEk7sfKHfnAXfWNSQx5vgvVq8Fs'
// function renderQRcode() {
//   return (
//     <div>
//       <p>QR Code Example</p>
//       <QRCode
//         value={assessmentLink}
//         size={300}
//         level={"M"}
//       />
//     </div>
//   )
// }

function App() {
  // const counter = useSelector(s => s.counter)
  // const counterRunningState = useSelector(s => s.counterRunningState)
  // const autoFetch = useSelector(s => s.autoFetch)
  const patients = useSelector(s => s.patients)
  const patientLEK = useSelector(s => s.patientLEK)
  const dispatch = useDispatch()

  async function handleCall() {
    dispatch({
      type: 'REFRESH_PART_PATIENT_LIST',
    })
  }

  function handleClear() {
    console.clear()
    dispatch({
      type: 'CLEAR_PATIENTS'
    })
    dispatch({
      type: 'SET_LEK',
      payload: 'START',
    })
  }

  function handleRefresh() {
    if (!patientLEK) {
      dispatch({
        type: 'SET_LEK',
        payload: 'START',
      })
    }

    dispatch({
      type: 'REFRESH_PATIENT_LIST'
    })
  }

  // const action = (type) => dispatch({ type })

  return (
    <div className="App-header">
      <p>Patient List</p>
      {/* {renderQRcode()} */}
      {/* <div>
        <button onClick={() => action('INCREMENT_ASYNC')}>Increment</button>
        <p>{`Count: ${counter}`}</p>
      </div> */}
      {/* <div>
        <button onClick={() => dispatch({ type: 'START_AUTOFETCH' })}>Start Auto Fetch</button>
        <button onClick={() => dispatch({ type: 'STOP_AUTOFETCH' })}>Stop Auto Fetch</button>
        <p>{`Auto Fetch is: ${autoFetch ? 'ON' : 'OFF'}`}</p>
      </div> */}
      <div>
        <button onClick={handleRefresh}>Auto Refresh All</button>
        <button onClick={handleCall}>Call API Manually</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <div>
        {patients.map((patient) => (
          <div className='list-item' key={patient.patientId}>
            <p>{patient.onboarding ? 'true' : 'false'}</p>
            <p>{new Date(patient.dateOfLastLog).toLocaleDateString()}</p>
            <p>{patient.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
