const User = require('../models/user.model');
const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
//const admin = require('firebase-admin');
const { admin, auth } = require('../config/firebaseAdmin');

// Generate backend JWT (for session)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// --- THIS FUNCTION IS NOW CORRECTED ---
const firebaseLogin = async (req, res) => {
  try {
    // Read token from header (preferred)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No Firebase token provided" });
    }
    const firebaseToken = authHeader.split(" ")[1];

    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    // console.log("Decoded Firebase token:", decodedToken);

    // User lookup/creation
    let user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      user = await User.create({
        username: decodedToken.name || decodedToken.email.split('@')[0],
        email: decodedToken.email,
        password: decodedToken.uid, 
      });
    }

    // Create backend token
    const backendToken = generateToken(user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: backendToken,
    });
  } catch (error) {
    console.error("Firebase login error:", error);
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

// --- END OF FIX ---


const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const adminUser = await Admin.findOne({ username });
    if (!adminUser) {
      return res.status(401).json({ message: 'Admin not found' });
    }

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

module.exports = {
  firebaseLogin,
  loginAdmin,
};
