const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  setrole
} = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

// The 'protect' middleware is no longer needed here because of the line above
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/role').put(setrole);

module.exports = router;