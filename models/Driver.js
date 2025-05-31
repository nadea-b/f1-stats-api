const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  name: String,
  team: String,
  country: String,
});

module.exports = mongoose.model("Driver", DriverSchema);
