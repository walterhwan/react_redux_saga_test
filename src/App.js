import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import QRCode from 'qrcode.react';

import './App.css';

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
  const patients = useSelector(s => s.patients);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: 'GET_PATIENTS_REQUEST',
    });
  }, [dispatch]);

  async function handleCall() {
    dispatch({
      type: 'GET_PAGINATED_PATIENTS_REQUEST',
    });
  }

  function handleClear() {
    console.clear();
    dispatch({
      type: 'CLEAR_PATIENTS',
    });
    dispatch({
      type: 'CLEAR_LEK',
    });
  }

  function handleRefresh() {
    dispatch({
      type: 'GET_PATIENTS_REQUEST',
    });
  }

  function handleCancel() {
    dispatch({
      type: 'CANCEL_GET_PATIENTS_REQUEST',
    });
  }

  return (
    <div className="App-header">
      <p>Patient List</p>
      {/* {renderQRcode()} */}
      <div>
        <button onClick={handleRefresh}>Auto Refresh</button>
        <button onClick={handleCancel}>Cancel Auto Refresh</button>
        <button onClick={handleCall}>Call API Manually</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <div>
        {patients.map(patient => (
          <div className="list-item" key={patient.patientId}>
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
