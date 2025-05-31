const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  color: String,
  countryOrigin: String,
  points: Number,
  championships: Number,
  wins: Number,
  podiums: Number,
  logoUrl: String,
  drivers: [Number],
  statistics: {
    constructorsPosition: [Number],
    pointsPerRace: [Number],
  }
});

module.exports = mongoose.model('Team', teamSchema);
