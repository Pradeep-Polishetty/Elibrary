const admin = require('../firebase');

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

//module.exports = { protect };

// Check if user is admin
const isAdmin = (req, res, next) => {
  // You can check Firebase custom claims OR MongoDB role
  if (req.user && req.user.email === process.env.ADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { protect, isAdmin };
