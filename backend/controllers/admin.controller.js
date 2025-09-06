const Book = require('../models/book.model');
const User = require('../models/user.model');
const { uploadFile } = require('../services/cloudinary.service');

// Get dashboard stats (no changes here)
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const mostViewedBooks = await Book.find()
      .sort({ viewCount: -1 })
      .limit(10)
      .select('name author viewCount lastViewed');

    res.json({
      totalUsers,
      totalBooks,
      mostViewedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Upload a new book
const uploadBook = async (req, res) => {
  // --- THIS IS THE CHANGE ---
  const { name, author, publishedBy, tag, access } = req.body;

  if (!name || !author || !publishedBy || !tag || !access || !req.file) {
    return res.status(400).json({ message: 'Please provide all fields and a file' });
  }
  // --- END OF CHANGE ---

  try {
    const result = await uploadFile(req.file.buffer, 'books');
    
    const newBook = await Book.create({
      name,
      author,
      publishedBy,
      tag,
      access, // --- ADDED 'access' field ---
      cloudinaryFileUrl: result.secure_url,
      cloudinaryFileId: result.public_id,
    });

    res.status(201).json(newBook);
  } catch (error)
 {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all users (no changes here)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
    getDashboardStats,
    uploadBook,
    getAllUsers
};