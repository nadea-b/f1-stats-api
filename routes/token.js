const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/", (req, res) => {
  const { role } = req.body;

  if (!role) return res.status(400).json({ message: "Role is required" });

  const token = jwt.sign(
    { role }, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token });
});

module.exports = router;

//http://localhost:5000/token POST
//{ "role": "ADMIN" }