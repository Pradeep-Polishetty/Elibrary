const express = require('express');
const { firebaseAuth, loginAdmin } = require('../controllers/auth.controller');
const router = express.Router();

// Firebase login for users
router.post('/login', firebaseAuth);

// Admin login (still custom DB)
router.post('/admin/login', loginAdmin);

module.exports = router;
