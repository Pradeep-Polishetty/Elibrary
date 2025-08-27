const express = require('express');
const router = express.Router();
const { getDashboardStats, uploadBook,getAllUsers } = require('../controllers/admin.controller');
const { protect ,isAdmin} = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// Protect all admin routes
router.use(protect, isAdmin);

router.get('/dashboard', getDashboardStats);
router.post('/books/upload', upload.single('bookFile'), uploadBook);
router.get('/users', getAllUsers); 


module.exports = router;