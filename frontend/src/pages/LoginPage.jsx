import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
// Import Firebase auth functions for both email and Google
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useFirebaseLoginMutation } from '../store/slices/apiSlice'; // <-- CORRECTED: Use the correct hook import

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Call the correct hook and get its isLoading state
  const [firebaseLogin, { isLoading }] = useFirebaseLoginMutation(); 
  const [error, setErr] = useState(null);

  // --- Main handler for both login types ---
  const handleLogin = async (firebaseUser) => {
    try {
      const firebaseToken = await firebaseUser.getIdToken(true);
      // Use the correct trigger function from the hook
      const apiResponse = await firebaseLogin({ firebaseToken }).unwrap();

      // Save your backend's credentials (user info + custom JWT) in Redux
      dispatch(setCredentials({
        user: apiResponse,
        token: apiResponse.token,
      }));

      toast.success('Login successful!');
      navigate('/');
    } catch (apiErr) {
        toast.error(apiErr?.data?.message || 'Could not verify with the server.');
        setErr('Could not verify with the server.');
    }
  };

  // --- Handler for Email/Password Form ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleLogin(userCredential.user);
    } catch (firebaseErr) {
      toast.error(firebaseErr.message || 'Login failed');
      setErr('Please enter correct email and password');
    }
  };

  // --- Handler for Google Sign-In Button ---
  const handleGoogleSignIn = async () => {
    setErr(null);
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        await handleLogin(result.user);
    } catch (firebaseErr) {
        toast.error(firebaseErr.message || "Google Sign-In failed.");
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 bg-dark shadow-sm border-black" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 text-white">User Login</h2>
        
        {/* --- Google Sign-In Button (Your Design) --- */}
        <button 
          onClick={handleGoogleSignIn} 
          className="btn btn-outline-success w-100 mb-3 d-flex align-items-center justify-content-center" 
          disabled={isLoading}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" style={{ height: '20px', marginRight: '10px' }} />
          Sign in with Google
        </button>

        <div className="text-center text-white my-2">OR</div>

        {/* --- Email/Password Form (Your Design) --- */}
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
          {error && <div className="text-danger mt-1"><p>{error}</p></div>}
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

