const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Admin = require('../models/admin.model'); // <-- 1. Import Admin model

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // --- THIS IS THE FIX ---
    // Try to find the ID in the User collection first, then in the Admin collection.
    let user = await User.findById(decoded.id).select('-password');
    if (!user) {
        user = await Admin.findById(decoded.id).select('-password');
    }
    // --- END OF FIX ---

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user; // Attach the found user or admin to the request
  
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
const attachUserIfAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log(decodedToken);
      let user = await User.findOne({ firebaseUid: decodedToken.uid }).select("-password");
      if (!user) {
        user = await Admin.findOne({ firebaseUid: decodedToken.uid }).select("-password");
      }
      console.log(user)
      req.user = user || null;
    } catch (error) {
      req.user = null; // invalid Firebase token → treat as guest
    }
  }
  next();
};


const isAdmin = (req, res, next) => {
  // Check if the user object attached by 'protect' is an instance of the Admin model
  if (req.user && req.user instanceof Admin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { protect, isAdmin,attachUserIfAuthenticated };

