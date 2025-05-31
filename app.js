const express = require('express');
const cors = require('cors');
const externalDriverRoutes = require("./routes/externalDrivers");
const internalDriverRoutes = require("./routes/internalDrivers");
const externalTeamRoutes = require('./routes/externalTeams');
const internalTeamRoutes = require('./routes/internalTeams');
const teams = require('./data/sampleTeams.json');
const tokenRoutes = require("./routes/token");
const connectDB = require('./db');

connectDB();

const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/external-drivers", externalDriverRoutes);
app.use("/api/drivers", internalDriverRoutes);
app.use('/api/external-teams', externalTeamRoutes);
app.use('/api/teams', internalTeamRoutes);
app.use("/token", tokenRoutes);

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the F1 backend!' });
});

module.exports = app;
