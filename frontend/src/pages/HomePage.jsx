import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice'; // Adjust path if needed
import BookList from '../components/books/BookList'; // Import BookList

const HomePage = () => {
  const user = useSelector(selectCurrentUser);

  // Local state for tag filter
  const [tagFilter, setTagFilter] = useState("");
  
  // Example tags — ideally you’ll fetch these from backend or Redux store
  const tags = ["Fiction", "Non-fiction", "Science", "History", "Technology"];

  return (
    <div className="container py-5">
      <div className="p-5 mb-4 text-center text-info rounded-3">
        {user ? (
          <h1 className="display-4">Welcome back, {user.username}!</h1>
        ) : (
          <h1 className="display-4">Welcome to the E-Library</h1>
        )}
        <p className="lead text-info text-opacity-75">
          Browse our collection of books, leave reviews, and enjoy your reading.
        </p>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="tagFilter" className="form-label text-info text-opacity-75">Filter by Tag</label>
          <select 
            id="tagFilter" 
            className="form-select" 
            value={tagFilter} 
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pass the selected tag down to the BookList */}
      <BookList tag={tagFilter} />
    </div>
  );
};

export default HomePage;
