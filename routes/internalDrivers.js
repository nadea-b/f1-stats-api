const express = require("express");
const Driver = require("../models/Driver");
const auth = require("../middleware/auth");

const router = express.Router();

// Create
router.post("/", auth(["ADMIN", "WRITER"]), async (req, res) => {
  try {
    const newDriver = await Driver.create(req.body);
    res.status(201).json(newDriver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read (All) with pagination
router.get("/", auth(["ADMIN", "WRITER", "VISITOR"]), async (req, res) => {
  const { limit = 5, skip = 0 } = req.query;
  try {
    const drivers = await Driver.find().limit(Number(limit)).skip(Number(skip));
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read (Single)
router.get("/:id", auth(["ADMIN", "WRITER", "VISITOR"]), async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: "Not found" });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put("/:id", auth(["ADMIN", "WRITER"]), async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) return res.status(404).json({ message: "Not found" });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", auth(["ADMIN"]), async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Driver deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
