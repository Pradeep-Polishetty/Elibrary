const Book = require('../models/book.model');
const Rating = require('../models/rating.model');

// Get all books with filtering and access control
const getAllBooks = async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = {};
    console.log('Authenticated user:', req.user); // Debugging line to check req.user
    // --- CORRECTED ACCESS CONTROL LOGIC ---
    // The req.user is now reliably attached by the new middleware
    console.log(req.user.role);
    if (req.user && req.user.role) {
      if (req.user.role === 'student') {
        filter.access = { $in: ['all', 'student'] };
      } else if (req.user.role === 'faculty') {
        filter.access = { $in: ['all', 'faculty'] };
      }
      // If admin or 'unassigned', no access filter is applied, so they see all books.
    } else {
      // Unauthenticated users only see public books
      filter.access = 'all';
    }
    // --- END ---

    if (tag) {
        // Make the tag filter case-insensitive
        filter.tag = { $regex: new RegExp(`^${tag}$`, 'i') };
    }
    // console.log('Filter applied:', filter); // Debugging line to check the filter
    
    const books = await Book.find(filter).select('-cloudinaryFileId');
    console.log("Books found:", books); // Debugging line to check number of books found 
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// Get single book details (no changes here)
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

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

// Rate a book (no changes here)
const rateBook = async (req, res) => {
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

    const existingRating = await Rating.findOne({ book: bookId, user: userId });
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this book' });
    }

    await Rating.create({
      book: bookId,
      user: userId,
      username,
      rating,
      feedback,
    });
    
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

module.exports = {
    getAllBooks,
    getBookById,
    rateBook
};