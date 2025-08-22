import React from 'react';
import RatingForm from './RatingForm';

const BookDetail = () => {
  // This data would come from your API
  // const book = { name: 'The Hobbit', author: 'J.R.R. Tolkien', publishedBy: 'George Allen & Unwin' };
  
  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{book.name}</h1>
          <h4 className="card-subtitle mb-2 text-muted">{book.author}</h4>
          <p className="card-text">Published by: {book.publishedBy}</p>
          <a href="#" className="btn btn-primary">Read Book (PDF)</a>
        </div>
      </div>
      <hr className="my-4" />
      <RatingForm />
    </div>
  );
};

export default BookDetail;