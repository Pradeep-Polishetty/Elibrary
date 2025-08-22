import React from 'react';

const UploadForm = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Upload New Book</h1>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="bookName" className="form-label">Book Name</label>
              <input type="text" className="form-control" id="bookName" required />
            </div>
            <div className="mb-3">
              <label htmlFor="authorName" className="form-label">Author Name</label>
              <input type="text" className="form-control" id="authorName" required />
            </div>
            <div className="mb-3">
              <label htmlFor="publishedBy" className="form-label">Published By</label>
              <input type="text" className="form-control" id="publishedBy" required />
            </div>
            <div className="mb-3">
              <label htmlFor="bookFile" className="form-label">Book File (PDF only)</label>
              <input type="file" className="form-control" id="bookFile" accept=".pdf" required />
            </div>
            <button type="submit" className="btn btn-primary">Upload Book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
