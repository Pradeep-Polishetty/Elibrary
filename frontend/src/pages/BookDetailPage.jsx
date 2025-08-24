import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetBookByIdQuery } from '../store/slices/apiSlice'; // Adjust path if needed
import { selectCurrentUser } from '../store/slices/authSlice'; // Adjust path if needed
import LoadingSpinner from '../components/common/LoadingSpinner';
import RatingForm from '../components/books/RatingForm';

const BookDetailPage = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const { data, isLoading, isError, error } = useGetBookByIdQuery(id);
  const user = useSelector(selectCurrentUser); // Check if a user is logged in

  if (isLoading) {
    return <LoadingSpinner />;
  }
  

  if (isError) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Error: {error.data?.message || 'Could not fetch book details.'}
        </div>
      </div>
    );
  }

  const { details: book, feedbacks } = data;

          console.log(feedbacks);
          console.log(user);
  return (
    <div className="container py-5">
      <div className='d-flex justify-content-around mb-4  gap-4'>
          <div className="card mb-4 w-50 ">
            <div className="card-body ">
              <h1 className="card-title">{book.name}</h1>
              <h4 className="card-subtitle mb-2 text-muted">by {book.author}</h4>
              <p className="card-text">
                <strong>Published By:</strong> {book.publishedBy}
              </p>
              <p className="card-text">
                <strong>Average Rating:</strong> {book.averageRating ? book.averageRating.toFixed(1) : 'N/A'} / 5
              </p>
              <a href={book.cloudinaryFileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Read Book (PDF)
              </a>
            </div>
          </div>

          <div className="card w-50">
            <div className="card-body">
              <h2 className="mb-3">Feedback</h2>
              {feedbacks && feedbacks.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {feedbacks.map((feedback) => (
                    <li key={feedback._id} className="list-group-item">
                      <p><strong>{feedback.username}</strong> rated it {feedback.rating} / 5</p>
                      {feedback.feedback && <p className="mb-0 fst-italic">"{feedback.feedback}"</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No feedback yet. Be the first to leave a review!</p>
              )}
            </div>
          </div>
      </div>
      
      {/* Conditionally render the RatingForm if a user is logged in */}
    {(() => {
  // First, check if the user has already left a review.
  // The '?.' (optional chaining) prevents errors if 'feedbacks' is null or undefined.
  const hasUserReviewed = user && feedbacks?.some(
    (feedback) => feedback.username === user.username
  );

  // Now, use the result to render the correct component.
  if (hasUserReviewed) {
    return <p className='text-info text-center'>You have already submitted your feedback for this book.</p>;
  } else if (user) {
    // Show the form only if a user is logged in and hasn't reviewed.
    return <RatingForm bookId={book._id} />;
  }
  
  // Return null or an empty fragment if there's no user.
  return null; 
})()}
            
      {/* {user && <RatingForm bookId={book._id} />} */}
      
    </div>
  );
};

export default BookDetailPage;