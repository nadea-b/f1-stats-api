const express = require('express');
const router = express.Router();

// Sample teams data
const teams = require('../data/sampleTeams.json');

// GET /api/teams
router.get('/', (req, res) => {
  res.json(teams);
});

module.exports = router;
