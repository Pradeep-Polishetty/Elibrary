// ==================================================================================
// FUNCTIONAL PROFILE PAGE
// ==================================================================================

// ----------------------------------------------------------------------------------
// FILE: frontend/src/pages/ProfilePage.jsx (Replace with this functional version)
// PURPOSE: This version fetches user data, displays it, and allows the user to
// enter an "edit mode" to update their information.
// ----------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateProfileMutation, useGetProfileQuery } from '../store/slices/apiSlice';
import { selectCurrentUser } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State to toggle between view and edit modes
  const [isEditMode, setIsEditMode] = useState(false);

  // RTK Query hooks
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Populate form with user data when it's fetched
  useEffect(() => {
    if (profileData) {
      setUsername(profileData.username);
      setEmail(profileData.email);
    }
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const updateData = { username, email };
      if (password) {
        updateData.password = password;
      }
      await updateProfile(updateData).unwrap();
      toast.success('Profile updated successfully!');
      setPassword('');
      setConfirmPassword('');
      setIsEditMode(false); // Exit edit mode on success
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update profile.');
    }
  };
  
  const handleCancelEdit = () => {
    // Reset fields to their original state and exit edit mode
    if (profileData) {
      setUsername(profileData.username);
      setEmail(profileData.email);
    }
    setIsEditMode(false);
  };

  if (isLoadingProfile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container  py-5">
      <h1 className="mb-4 text-info text-opacity-75 ">User Profile</h1>
      <div className=' d-flex justify-content-center align-items-center'>
      <div className="card w-50  bg-dark shadow-sm">
        <div className="card-body ">
          {isEditMode ? (
            // --- EDIT MODE FORM ---
            <form onSubmit={handleSubmit}>
              <div className=" mb-3">
                <label htmlFor="username" className="form-label text-primary text-opacity-75 ">Username</label>
                <input
                  type="text"
                  className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-primary text-opacity-75">Email</label>
                <input
                  type="email"
                  className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <hr className="my-4" />
              <h5 className="mb-3 text-primary ">Change Password</h5>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-primary text-opacity-75">New Password</label>
                <input
                  type="password"
                  className="form-control bg-dark bg-opacity-25 border-success-subtle text-info custom-placeholder"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label text-primary text-opacity-75">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control bg-dark bg-opacity-25 border-success-subtle text-info"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-outline-info me-2" disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Save Changes'}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            </form>
          ) : (
            // --- DISPLAY MODE ---
            <div>
              <div className="mb-3">
                <strong className='text-primary text-opacity-75'>Username:</strong>
                <p className='text-info'>{username}</p>
              </div>
              <div className="mb-3">
                <strong className='text-primary text-opacity-75'>Email:</strong>
                <p className='text-info'>{email}</p>
              </div>
              <button className="btn btn-outline-primary" onClick={() => setIsEditMode(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
