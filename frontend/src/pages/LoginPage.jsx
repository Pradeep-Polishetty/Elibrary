import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useLoginMutation } from '../store/slices/apiSlice'; // custom API

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginApi] = useLoginMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErr] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Step 1: Firebase login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Get Firebase token
    const firebaseToken = await user.getIdToken(true);

    // Step 3: Send token to backend in headers
    const apiResponse = await loginApi({ firebaseToken }).unwrap();

    // Step 4: Save backend JWT in Redux
    dispatch(setCredentials({
      user: { uid: user.uid, email: user.email, username: apiResponse.username },
      token: apiResponse.token,   // backend JWT
      firebaseToken
    }));

    toast.success('Login successful!');
    navigate('/');
  } catch (err) {
    toast.error(err?.data?.message || err.message || 'Login failed');
    setErr('please enter correct email and password');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 bg-dark shadow-sm border-black" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 text-white">User Login</h2>
        <form onSubmit={handleSubmit}>
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
          {error!==null && <div className="text-danger mt-1"><p>{error}</p></div>}
          <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-3">
          <p className='text-warning text-opacity-50'>
            Don't have an account? <Link to="/register" className='text-info text-opacity-75'>Register</Link>
          </p>
          <p><Link to="/admin/login" className="text-secondary">Login as Admin</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
