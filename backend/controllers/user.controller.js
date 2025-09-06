const User = require('../models/user.model');

// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = async (req, res) => {
  // The user's ID is attached by the 'protect' middleware. We fetch the full profile.
  const user = await User.findById(req.user.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; // The pre-save hook will hash it
    }

    const updatedUser = await user.save();

    // Send back the updated user object (without the password)
    const userToReturn = updatedUser.toObject();
    delete userToReturn.password;
    
    res.json(userToReturn);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Set user role
// @route   PUT /api/users/role
const setrole = async (req, res) => {
  const { role } = req.body;
  if (!['student', 'faculty'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  try {
    const user = await User.findById(req.user.id); // <-- Use req.user.id

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.role !== null) {
      return res.status(400).json({ message: 'Role has already been set.' });
    }

    user.role = role;
    await user.save();
    
    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile, setrole };