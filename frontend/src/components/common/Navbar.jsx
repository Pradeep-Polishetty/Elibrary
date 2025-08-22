import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logOut } from '../../store/slices/authSlice'; // Adjust path if needed
import toast from 'react-hot-toast';

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Check if the user object exists to determine login status
  const isLoggedIn = !!user;
  // Check for the isAdmin flag in the user object
  const isAdmin = user?.isAdmin;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">E-Library</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              // --- Logged In View ---
              <>
                {!isAdmin && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                  </li>
                )}
                {isAdmin && (
                  // --- Admin-Only Dropdown ---
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Admin
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                      <li><Link className="dropdown-item" to="/admin/upload">Upload Book</Link></li>
                    </ul>
                  </li>
                )}
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
                </li>
              </>
            ) : (
              // --- Logged Out View ---
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
