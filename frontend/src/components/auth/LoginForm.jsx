import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ isAdmin = false }) => {
  return (
    <div className={`container d-flex justify-content-center align-items-center vh-100 ${isAdmin ? 'bg-secondary' : ''}`}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required />
          </div>
          <button type="submit" className={`btn ${isAdmin ? 'btn-success' : 'btn-primary'} w-100`}>
            Sign In
          </button>
        </form>
        {!isAdmin && (
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
