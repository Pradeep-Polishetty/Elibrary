const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  publishedBy: { type: String, required: true },
  tag: { type: String, required: true },
  // --- THIS IS THE CHANGE ---
  access: {
    type: String,
    enum: ['all', 'student', 'faculty'],
    default: 'all',
    required: true,
  },
  // --- END OF CHANGE ---
  cloudinaryFileUrl: { type: String, required: true },
  cloudinaryFileId: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  lastViewed: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);