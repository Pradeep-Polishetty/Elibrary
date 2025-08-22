import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice'; // Adjust path if needed
import BookList from '../components/books/BookList'; // Import BookList

const HomePage = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="container py-5">
      <div className="p-5 mb-4 text-center bg-light rounded-3">
        {user ? (
          <h1 className="display-4">Welcome back, {user.username}!</h1>
        ) : (
          <h1 className="display-4">Welcome to the E-Library</h1>
        )}
        <p className="lead">
          Browse our collection of books, leave reviews, and enjoy your reading.
        </p>
      </div>
      
      {/* --- RENDER THE BOOK LIST --- */}
      <BookList />

    </div>
  );
};

export default HomePage;