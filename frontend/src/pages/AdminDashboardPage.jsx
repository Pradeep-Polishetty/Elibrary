import React from 'react';
import { useGetDashboardStatsQuery } from '../store/slices/apiSlice'; // Adjust path if needed
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminDashboardPage = () => {
  const { data: stats, isLoading, isError, error } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Error: {error.data?.message || 'Could not fetch dashboard stats.'}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-2">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card text-white bg-info h-100">
            <div className="card-body">
              <h5 className="card-title">Total Books</h5>
              <p className="card-text fs-2">{stats.totalBooks}</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-4">Most Viewed Books</h2>
      {stats.mostViewedBooks && stats.mostViewedBooks.length > 0 ? (
        <div className="list-group">
          {stats.mostViewedBooks.map((book) => (
            <div key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
              {book.name} by {book.author}
              <span className="badge bg-primary rounded-pill">{book.viewCount} views</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No book viewing data available.</p>
      )}
    </div>
  );
};

export default AdminDashboardPage;