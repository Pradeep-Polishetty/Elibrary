import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { setCredentials } from '../store/slices/authSlice';
import { useFirebaseLoginMutation } from '../store/slices/apiSlice';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firebaseLogin] = useFirebaseLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //console.log("Registering user:", { username, email });

    try {
      // Step 1: Create user in Firebase with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      

      const user = userCredential.user;
      console.log("Firebase user created:", user);

      // Step 2: Set their display name (username) in their Firebase profile
      await updateProfile(user, { displayName: username });
      
      // Step 3: Get the Firebase token and log them into your backend
      // This creates the user in your own MongoDB database
      const firebaseToken = await user.getIdToken();
      const apiResponse = await firebaseLogin({ firebaseToken }).unwrap();

      // Step 4: Save the credentials from your backend to the Redux store
      dispatch(setCredentials({
        user: apiResponse, // This now includes the 'unassigned' role
        token: apiResponse.token,
      }));

      toast.success('Registration successful!');
      navigate('/'); // Redirect to the homepage to see the role selection pop-up
    }catch (err) {
      console.error("🔥 Registration error:", err);   // <--- add this
      toast.error(err?.data?.message || err.message || 'Registration failed.');
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
              placeholder="At least 6 characters"
            />
          </div>
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
