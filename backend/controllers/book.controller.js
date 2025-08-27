const Book = require('../models/book.model');
const Rating = require('../models/rating.model');
const mongoose = require('mongoose');

// @desc    Get all books with filtering
// @route   GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const { name, author, rating, tag } = req.query; // <-- Add 'tag' here
    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (rating) filter.averageRating = { $gte: Number(rating) };
    if (tag) filter.tag = tag; // <-- Add this line

    const books = await Book.find(filter).select('-cloudinaryFileId');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single book details
// @route   GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Increment view count and update last viewed date
    book.viewCount += 1;
    book.lastViewed = new Date();
    await book.save();
    
    const feedbacks = await Rating.find({ book: req.params.id }).select('username rating feedback createdAt');

    res.json({
      details: book,
      feedbacks: feedbacks
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Rate a book and add feedback
// @route   POST /api/books/:id/rate
exports.rateBook = async (req, res) => {
  const { rating, feedback } = req.body;
  const bookId = req.params.id;
  const userId = req.user._id;
  const username = req.user.username;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user has already rated this book
    const existingRating = await Rating.findOne({ book: bookId, user: userId });
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this book' });
    }

    // Create new rating
    await Rating.create({
      book: bookId,
      user: userId,
      username,
      rating,
      feedback,
    });
    
    // Recalculate average rating for the book
    const ratings = await Rating.find({ book: bookId });
    const totalRating = ratings.reduce((acc, item) => item.rating + acc, 0);
    book.averageRating = totalRating / ratings.length;
    book.ratingsCount = ratings.length;
    await book.save();
    
    res.status(201).json({ message: 'Rating submitted successfully', newAverageRating: book.averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};