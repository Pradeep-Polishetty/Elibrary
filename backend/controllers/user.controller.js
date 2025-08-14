const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // The user is already available from the 'protect' middleware
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; // The pre-save hook will hash it
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { getUserProfile, updateUserProfile };