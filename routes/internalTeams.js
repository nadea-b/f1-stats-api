const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const authenticateToken = require('../routes/token');
const authorize = require('../middleware/auth');

// CREATE
router.post('/', authenticateToken, authorize(['ADMIN', 'WRITER']), async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ with pagination
router.get('/', authenticateToken, authorize(['ADMIN', 'WRITER', 'VISITOR']), async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;

  try {
    const teams = await Team.find().limit(limit).skip(skip);
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ single
router.get('/:id', authenticateToken, authorize(['ADMIN', 'WRITER', 'VISITOR']), async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put('/:id', authenticateToken, authorize(['ADMIN']), async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', authenticateToken, authorize(['ADMIN']), async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
