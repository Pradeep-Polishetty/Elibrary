import React, { useState } from 'react';
import { useRateBookMutation } from '../../store/slices/apiSlice'; // Adjust path if needed
import toast from 'react-hot-toast';

const RatingForm = ({ bookId }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [rateBook, { isLoading }] = useRateBookMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await rateBook({ id: bookId, rating, feedback }).unwrap();
      toast.success('Thank you for your feedback!');
      setFeedback('');
      setRating(5);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit rating.');
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h3 className="card-title">Leave a Rating</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating (1-5)</label>
            <select 
              className="form-select" 
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">Feedback (optional)</label>
            <textarea 
              className="form-control" 
              id="feedback" 
              rows="3"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Rating'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingForm;

