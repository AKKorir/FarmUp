const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    console.log(username,password, user)
    if (password===user.password) {
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
      console.log(token)
      res.json({ token, role: user.role });
    } else {
      console.log("Not found in the database")

      res.json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/hello', (req, res) => {
  res.json({ message:"Hello from user routes" });
});

router.get('/user', authenticateToken, (req, res) => {
  res.json({ role: "agent" });
});

module.exports = router;