import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'; // Correct path to your firebase config
import { useGetUsersQuery } from '../store/slices/apiSlice'; // 1. Import from apiSlice
import { setCredentials } from '../store/slices/authSlice';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the list of existing users to check for duplicates
  const { data: users } = useGetUsersQuery();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Corrected logic to check if the username already exists
    const usernameExists = users?.some(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (usernameExists) {
      toast.error('Username already exists. Please choose another.');
      // console.error('Registration error:', err);
      setError('Username already exists. Please choose another.');
      return;
    }

    setIsLoading(true);
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the user's display name in their Firebase profile
      await updateProfile(user, { displayName: username });

      // Save user credentials (including your custom backend token if needed) to Redux
      dispatch(setCredentials({ 
        user: { uid: user.uid, email: user.email, displayName: username }, 
        token: await user.getIdToken() 
      }));

      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card bg-dark shadow-sm p-4 " style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center text-white mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-primary">Username</label>
            <input
              type="text"
              className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-primary">Email</label>
            <input
              type="email"
              className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-primary">Password</label>
            <input
              type="password"
              className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error!==null && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-warning text-opacity-50 mt-3">
          Already have an account? <Link to="/login" className='text-info text-opacity-75'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;