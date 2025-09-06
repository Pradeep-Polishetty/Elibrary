const express = require('express');
const router = express.Router();
// --- CORRECTED IMPORT ---
const { loginAdmin, firebaseLogin } = require('../controllers/auth.controller');

// --- CORRECTED ROUTE to /firebase-login ---
router.post('/firebase-login', firebaseLogin);

// Admin login (still custom DB)
router.post('/admin/login', loginAdmin);

module.exports = router;