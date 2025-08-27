import React from 'react';
import { useGetBooksQuery } from '../../store/slices/apiSlice';
import BookCard from './BookCard';
import LoadingSpinner from '../common/LoadingSpinner';

const BookList = ({ tag }) => { // <-- Accept tag as a prop
  // Pass the tag to the query hook. It will automatically refetch when the tag changes.
  const { data: books, isLoading, isError, error } = useGetBooksQuery({ tag });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="alert alert-danger">Error fetching books.</div>;

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {books && books.length > 0 ? (
        books.map(book => <BookCard key={book._id} book={book} />)
      ) : (
        <p>No books found for the selected filter.</p>
      )}
    </div>
  );
};

export default BookList;