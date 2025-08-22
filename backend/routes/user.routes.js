const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

router.route('/:profile').get(getUserProfile).put(updateUserProfile);

module.exports = router;