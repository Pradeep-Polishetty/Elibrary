const Book = require('../models/book.model');
const User = require('../models/user.model');
const { uploadFile } = require('../services/cloudinary.service');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    
    // Get books sorted by most viewed
    const mostViewedBooks = await Book.find()
      .sort({ viewCount: -1 })
      .limit(10) // Limit to top 10 for performance
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

// @desc    Upload a new book
// @route   POST /api/admin/books/upload
exports.uploadBook = async (req, res) => {
  const { name, author, publishedBy } = req.body;

  if (!name || !author || !publishedBy || !req.file) {
    return res.status(400).json({ message: 'Please provide all fields and a file' });
  }

  try {
    // Upload file to Cloudinary
    const result = await uploadFile(req.file.buffer, 'books');
    
    const newBook = await Book.create({
      name,
      author,
      publishedBy,
      cloudinaryFileUrl: result.secure_url,
      cloudinaryFileId: result.public_id,
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};