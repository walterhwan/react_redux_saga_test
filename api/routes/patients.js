const express = require('express');
const faker = require('faker');
const delay = require('delay');

const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  const exclusiveStartKey = req.query.exclusiveStartKey;
  const list = [
    {
      patientId: '9d46fb7c-5ffb-4ec8-8ef5-437f218fe837',
      name: 'Eleanora Runte DDS',
      onboarding: false,
      dateOfLastLog: 1557671920104,
    },
    {
      patientId: 'eb2723fd-ae1d-46ed-b1ca-72d458409d86',
      name: faker.name.findName(),
      onboarding: false,
      dateOfLastLog: 1556751716508,
    },
    {
      patientId: '5101f95c-1fb0-4a4d-bb24-51ca8a4df3c1',
      name: faker.name.findName(),
      onboarding: true,
      dateOfLastLog: 1557029230115,
    },
    {
      patientId: 'b19b542f-ed76-4ec4-8ee6-2afec8ba1367',
      name: faker.name.findName(),
      onboarding: true,
      dateOfLastLog: 1558065179111,
    },
    {
      patientId: 'eaba024b-b428-454a-82ef-8c6a1fc80887',
      name: 'Gerard Reichel',
      onboarding: false,
      dateOfLastLog: 1557317915995,
    },
    {
      patientId: '02e9589f-9c39-4d83-9b48-a44f458e0392',
      name: 'Ralph Sipes',
      onboarding: true,
      dateOfLastLog: 1557048015692,
    },
    {
      patientId: 'f73ad4ec-ca7d-4e35-a5a0-2a818ea46caa',
      name: faker.name.findName(),
      onboarding: false,
      dateOfLastLog: 1559315630845,
    },
    {
      patientId: 'e1db6161-e8a6-4ace-b7a3-13ce1eacbe1d',
      name: 'Sydnie Kuphal',
      onboarding: true,
      dateOfLastLog: 1558801975920,
    },
    {
      patientId: '366b4412-7ead-4407-a783-f2edac4dd093',
      name: 'Bella Will',
      onboarding: false,
      dateOfLastLog: 1557804859764,
    },
    {
      patientId: '58bdeb73-067b-4745-a310-2ef8a5ca4eaa',
      name: faker.name.findName(),
      onboarding: false,
      dateOfLastLog: 1558272736825,
    },
    {
      patientId: '11dd2235-e8b1-406f-83f8-0c08bc4230cf',
      name: 'Manuel Sauer',
      onboarding: false,
      dateOfLastLog: 1557403683294,
    },
    {
      patientId: 'de7ce77b-97df-48d9-993a-27c177660fec',
      name: 'Jarred Casper',
      onboarding: true,
      dateOfLastLog: 1557637686850,
    },
    {
      patientId: '43b4763c-3dbc-4a94-931f-1d772b78e694',
      name: faker.name.findName(),
      onboarding: true,
      dateOfLastLog: 1556708080683,
    },
  ];

  const returnSizeLimit = 5;
  let patients = [];
  if (!exclusiveStartKey) {
    patients = list.slice(0, returnSizeLimit);
  } else {
    const index = list.findIndex(el => el.patientId === exclusiveStartKey) + 1;
    if (index < 0) {
      patients = list.slice(0, returnSizeLimit);
    } else {
      patients = list.slice(index, index + returnSizeLimit);
    }
  }

  let lastEvaluatedKey;
  if (patients.length < returnSizeLimit) {
    lastEvaluatedKey = undefined;
  } else {
    lastEvaluatedKey = patients[patients.length - 1].patientId;
  }

  const returnJson = {
    patients,
    ...(lastEvaluatedKey && { lastEvaluatedKey }),
  };

  // const num = getRandomInt(3);
  // if (num === 0) {
  //   res.status(500);
  //   res.json({ error: 'Server Error' });
  // } else {
  //   await delay(300);
  //   res.json(returnJson);
  // }
  await delay(300);
  res.json(returnJson);
});

module.exports = router;
