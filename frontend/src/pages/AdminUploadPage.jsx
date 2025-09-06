import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadBookMutation } from '../store/slices/apiSlice';
import toast from 'react-hot-toast';

const AdminUploadPage = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedBy, setPublishedBy] = useState('');
  const [tag, setTag] = useState('');
  const [access, setAccess] = useState('all'); // <-- Add state for access
  const [bookFile, setBookFile] = useState(null);
  
  const tags = ["Fiction", "Non-fiction", "Science", "History", "Technology"];
  const navigate = useNavigate();
  const [uploadBook, { isLoading }] = useUploadBookMutation();

  const handleFileChange = (e) => {
    setBookFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('author', author);
    formData.append('publishedBy', publishedBy);
    formData.append('tag', tag);
    formData.append('access', access); // <-- Append access to form data
    formData.append('bookFile', bookFile);

    try {
      await uploadBook(formData).unwrap();
      toast.success('Book uploaded successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to upload book.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-info">Upload New Book</h1>
      <div className="card bg-dark shadow-sm border-black">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* ... other inputs for name, author, publishedBy, tag ... */}
            <div className="mb-3">
               <label htmlFor="bookName" className="form-label text-primary">Book Name</label>
               <input
                 type="text"
                 className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
                 id="bookName"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required
               />
            </div>
            <div className="mb-3">
                <label htmlFor="authorName" className="form-label text-primary">Author Name</label>
                <input
                    type="text"
                    className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
                    id="authorName"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="publishedBy" className="form-label text-primary">Published By</label>
                <input
                    type="text"
                    className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
                    id="publishedBy"
                    value={publishedBy}
                    onChange={(e) => setPublishedBy(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label text-primary">Tag / Category</label>
                <select
                    className="form-select bg-dark bg-opacity-25 border-success-subtle text-info"
                    id="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    required >
                    <option value="" disabled>Select a category...</option>
                    {tags.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* --- THIS IS THE NEW DROPDOWN --- */}
            <div className="mb-3">
              <label htmlFor="access" className="form-label text-primary">Access Level</label>
              <select
                id="access"
                className="form-select bg-dark bg-opacity-25 border-success-subtle text-info"
                value={access}
                onChange={(e) => setAccess(e.target.value)}
                required
              >
                <option value="all">All (Public)</option>
                <option value="student">Students Only</option>
                <option value="faculty">Faculty Only</option>
              </select>
            </div>
            {/* --- END OF NEW DROPDOWN --- */}
            
            <div className="mb-3">
              <label htmlFor="bookFile" className="form-label text-primary">Book File (PDF only)</label>
              <input
                type="file"
                className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
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