const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || admin.password !== password)
    return res.status(401).json({ message: "Invalid credentials" });

 const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
  expiresIn: "1d",
});

  res.json({ token });
});

module.exports = router;
