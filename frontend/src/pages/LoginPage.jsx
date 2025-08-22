import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../store/slices/apiSlice'; // Adjust path if needed
import { setCredentials } from '../store/slices/authSlice'; // Adjust path if needed
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // The .unwrap() will throw an error if the request fails
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ user: { username: userData.username }, token: userData.token }));
      toast.success('Login successful!');
      navigate('/'); // Redirect to homepage on success
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            <p><Link to="/admin/login" className="text-success">Login as Admin</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

