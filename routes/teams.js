const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  try {
    const response = await fetch('https://ergast.com/api/f1/current/constructors.json');
    const data = await response.json();

    const teams = data.MRData.ConstructorTable.Constructors.map(team => ({
      id: team.constructorId,
      name: team.name,
      nationality: team.nationality,
      url: team.url
    }));

    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

module.exports = router;
