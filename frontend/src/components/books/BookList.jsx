import React from 'react';
import { useGetBooksQuery } from '../../store/slices/apiSlice'; // Adjust path if needed
import BookCard from './BookCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { data } from 'react-router-dom';

const BookList = () => {
  // This line makes the live API call. The 'books' variable will contain
  // whatever the backend sends.
  const { data: books, isLoading, isError, error } = useGetBooksQuery();
  console.log(data,error)
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="alert alert-danger">Error: {error.data?.message || 'Could not fetch books.'}</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {/* This logic correctly checks if the 'books' array exists and has items */}
      {books && books.length > 0 ? (
        books.map(book => (
          <BookCard key={book._id} book={book} />
        ))
      ) : (
        // This will display if the backend returns an empty array
        <p>No books found.</p>
      )}
    </div>
  );
};

export default BookList;