const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./scripts/seedAdmin');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Seed default admin
seedAdmin();

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: false })); // Body parser for form data

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/books', require('./routes/book.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/users', require('./routes/user.routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));