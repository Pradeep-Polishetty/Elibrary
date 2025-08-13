const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, rateBook } = require('../controllers/book.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/:id/rate', protect, rateBook); // Only authenticated users can rate

module.exports = router;