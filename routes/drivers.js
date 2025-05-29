// /routes/drivers.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  try {
    const response = await fetch('https://ergast.com/api/f1/current/drivers.json');
    const data = await response.json();

    const drivers = data.MRData.DriverTable.Drivers.map(driver => ({
      id: driver.permanentNumber || driver.driverId,
      code: driver.code,
      name: `${driver.givenName} ${driver.familyName}`,
      nationality: driver.nationality,
      dateOfBirth: driver.dateOfBirth,
      url: driver.url
    }));

    res.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

module.exports = router;
