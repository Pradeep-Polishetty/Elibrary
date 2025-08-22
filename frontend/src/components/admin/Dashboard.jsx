import React from 'react';

const Dashboard = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-2">150</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card text-white bg-info h-100">
            <div className="card-body">
              <h5 className="card-title">Total Books</h5>
              <p className="card-text fs-2">75</p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-4">Most Viewed Books</h2>
      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action">Book One</a>
        <a href="#" className="list-group-item list-group-item-action">Book Two</a>
        <a href="#" className="list-group-item list-group-item-action">Book Three</a>
      </div>
    </div>
  );
};

export default Dashboard;