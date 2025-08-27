const User = require('../models/user.model');
const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

// Generate backend JWT (for session)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Firebase login
exports.firebaseAuth = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'No Firebase token provided' });

    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ email: decoded.email });
    if (!user) {
      user = await User.create({
        username: decoded.name || decoded.email.split('@')[0],
        email: decoded.email,
      });
    }

    // ✅ issue backend JWT only
    const backendToken = generateToken(user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: backendToken,
    });
  } catch (error) {
    console.error('Firebase login error:', error);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

// @desc Admin Login (still custom, not Firebase)
// @route POST /api/auth/admin/login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminUser = await Admin.findOne({ username });

    if (!adminUser) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    // For admin, still use password check (bcrypt if you stored hashed password)
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(password, adminUser.password);

    if (isMatch) {
      res.json({
        _id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        token: generateToken(adminUser._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
