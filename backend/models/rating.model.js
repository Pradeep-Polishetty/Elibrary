const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true }, // To easily display username with feedback
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, default: '' },
}, { timestamps: true });

// Prevent a user from rating the same book twice
ratingSchema.index({ book: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);