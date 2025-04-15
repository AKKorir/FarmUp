// backend/routes/contractRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../config/authMiddleware');
const { addProduce } = require('../controllers/contractController');

router.get('/example', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', role: req.user.role });
  });

module.exports = router;