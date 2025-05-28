const express = require('express');
const cors = require('cors');
const driverRoutes = require('./routes/drivers');
const teamRoutes = require('./routes/teams');
const teams = require('./data/sampleTeams.json');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/drivers', driverRoutes);
app.use('/api/teams', teamRoutes);

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the F1 backend!' });
});

module.exports = app;
