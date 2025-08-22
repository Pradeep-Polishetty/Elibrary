import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadBookMutation } from '../store/slices/apiSlice'; // Adjust path if needed
import toast from 'react-hot-toast';

const AdminUploadPage = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedBy, setPublishedBy] = useState('');
  const [bookFile, setBookFile] = useState(null);

  const navigate = useNavigate();
  const [uploadBook, { isLoading }] = useUploadBookMutation();

  const handleFileChange = (e) => {
    setBookFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !author || !publishedBy || !bookFile) {
      toast.error('Please fill out all fields and select a file.');
      return;
    }

    // Use FormData to send both text and file data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('author', author);
    formData.append('publishedBy', publishedBy);
    formData.append('bookFile', bookFile);

    try {
      await uploadBook(formData).unwrap();
      toast.success('Book uploaded successfully!');
      navigate('/admin/dashboard'); // Redirect after successful upload
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to upload book.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Upload New Book</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="bookName" className="form-label">Book Name</label>
              <input
                type="text"
                className="form-control"
                id="bookName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="authorName" className="form-label">Author Name</label>
              <input
                type="text"
                className="form-control"
                id="authorName"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publishedBy" className="form-label">Published By</label>
              <input
                type="text"
                className="form-control"
                id="publishedBy"
                value={publishedBy}
                onChange={(e) => setPublishedBy(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bookFile" className="form-label">Book File (PDF only)</label>
              <input
                type="file"
                className="form-control"
                id="bookFile"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Upload Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUploadPage;