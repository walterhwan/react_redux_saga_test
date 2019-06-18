const express = require('express');
const faker = require('faker');
const delay = require('delay');

const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  const obj = [
    {
      zipcode: faker.address.zipCode(),
      date: faker.date.recent(),
    },
    {
      zipcode: faker.address.zipCode(),
      date: faker.date.recent(),
    },
    {
      zipcode: faker.address.zipCode(),
      date: faker.date.recent(),
    },
  ]
  
  await delay(400)
  res.status(200).json({ items: obj })
});

module.exports = router;
