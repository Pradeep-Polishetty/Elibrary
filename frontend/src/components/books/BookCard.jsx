import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="col ">
      <div className="card h-100 text-info  bg-dark shadow-sm">
        {/* Using a placeholder for the book cover */}
        <img 
          src={`https://placehold.co/600x400/EEE/31343C?text=${book.name.replace(/\s/g, '+')}`} 
          className="card-img-top" 
          alt={`${book.name} cover`} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{book.name}</h5>
          <p className="card-text text-light-emphasis">{book.author}</p>
          <p className="card-text text-light-emphasis">
            <strong>Rating:</strong> {book.averageRating ? book.averageRating.toFixed(1) : 'N/A'} / 5
          </p>
          <Link to={`/books/${book._id}`} className="btn btn-outline-info mt-auto">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;