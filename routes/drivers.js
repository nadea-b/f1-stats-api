const express = require('express');
const router = express.Router();
const teams = require('../data/sampleTeams.json');

// Sample teams data
const drivers = require('../data/sampleDrivers.json');

router.get('/', (req, res) => {
  res.json(drivers);
});

module.exports = router;
