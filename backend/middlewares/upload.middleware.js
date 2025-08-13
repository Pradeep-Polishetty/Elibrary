const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit for PDF files
  },
  fileFilter: (req, file, cb) => {
    // Allow only pdf files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf format allowed!'), false);
    }
  },
});

module.exports = upload;