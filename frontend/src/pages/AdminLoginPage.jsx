import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAdminLoginMutation } from '../store/slices/apiSlice'; // Adjust path if needed
import { setCredentials } from '../store/slices/authSlice'; // Adjust path if needed
import toast from 'react-hot-toast';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminData = await adminLogin({ username, password }).unwrap();
      
      // --- THIS IS THE FIX ---
      // We are creating a user object that includes the isAdmin flag
      const userPayload = { 
        username: adminData.username, 
        isAdmin: true // This tells the rest of the app that the user is an admin
      };
      
      dispatch(setCredentials({ user: userPayload, token: adminData.token }));
      // --- END OF FIX ---

      toast.success('Admin login successful!');
      navigate('/admin/dashboard'); // Redirect to admin dashboard
    } catch (err) {
      toast.error(err?.data?.message || 'Admin login failed.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Admin Portal Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Admin Username</label>
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
          <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
