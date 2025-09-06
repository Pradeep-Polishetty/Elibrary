import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Inlined styles for animations and hover effects, keeping the component self-contained.
const pageStyles = `
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(23, 162, 184, 0.4); }
    70% { box-shadow: 0 0 0 25px rgba(23, 162, 184, 0); }
    100% { box-shadow: 0 0 0 0 rgba(23, 162, 184, 0); }
  }
  
  .hover-info:hover {
    color: #0dcaf0 !important;
    transition: color 0.3s ease;
  }
  
  .transition-all {
    transition: background-color 0.3s ease;
  }

  .feature-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(13, 202, 240, 0.1);
  }
`;

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: 'bi-collection',
      title: 'Vast Collection',
      description: 'Access thousands of books across all genres, from timeless classics to modern bestsellers.'
    },
    {
      icon: 'bi-phone-device',
      title: 'Read Anywhere',
      description: 'Enjoy your favorite books on any device, anytime. Your library is always with you.'
    },
    {
      icon: 'bi-people-fill',
      title: 'Community Reviews',
      description: 'Discover new books and share your thoughts with a community of fellow readers.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Books Available' },
    { number: '5K+', label: 'Active Readers' },
    { number: '24/7', label: 'Access' },
    { number: '50+', label: 'Genres' }
  ];

  return (
    <div className="bg-dark text-light">
      <style>{pageStyles}</style>

      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top transition-all ${
        scrolled ? 'bg-dark shadow-sm' : 'bg-transparent'
      }`}>
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3 text-info" to="/">
            <i className="bi bi-book-half me-2"></i>
            E-Library
          </Link>
          
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link text-light hover-info" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary hover-info" href="#features">Features</a>
              </li>
              <li className="nav-item ms-lg-3">
                <Link to="/login" className="btn btn-outline-info px-4 me-2">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-success px-4">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="position-relative overflow-hidden d-flex align-items-center" style={{minHeight: '100vh', background: 'linear-gradient(135deg, #0a1014 0%, #1a252f 100%)'}}>
        <div className="container">
          <div className="row w-100 align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-3 fw-bold mb-4">
                Your Digital Gateway to
                <span className="text-info d-block">Limitless Stories</span>
              </h1>
              
              <p className="lead text-secondary mb-5 fs-5">
                Dive into a universe of books. Explore thousands of titles, from academic texts to thrilling novels, all available at your fingertips.
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Link to="/register" className="btn btn-success btn-lg px-5 py-3">
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Start Reading Now
                </Link>
                <Link to="/login" className="btn btn-outline-info btn-lg px-5 py-3">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Member Login
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6 text-center d-none d-lg-block">
              <div className="position-relative">
                <div 
                  className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{width: '400px', height: '400px', animation: 'pulse 3s infinite'}}
                >
                  <div 
                    className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                    style={{width: '250px', height: '250px'}}
                  >
                    <i className="bi bi-book text-info" style={{fontSize: '6rem'}}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{backgroundColor: '#111827'}}>
        <div className="container">
          <div className="row">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3 text-center mb-4">
                <div className="card bg-dark border-secondary h-100">
                  <div className="card-body">
                    <h3 className="text-info fw-bold mb-1">{stat.number}</h3>
                    <p className="text-secondary mb-0">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-dark">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold text-info mb-3">
                Why You'll Love E-Library
              </h2>
              <p className="lead text-secondary">
                Discover the features that make our platform the preferred choice for students, faculty, and avid readers.
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="card bg-dark border-secondary h-100 feature-card">
                  <div className="card-body p-4 text-center">
                    <div className="mb-4">
                      <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                        <i className={`${feature.icon} text-info fs-4`}></i>
                      </div>
                    </div>
                    <h5 className="card-title text-light mb-3">{feature.title}</h5>
                    <p className="card-text text-secondary">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{backgroundColor: '#111827'}}>
        <div className="container">
          <div className="card bg-dark border-secondary">
            <div className="card-body p-5 text-center">
              <h3 className="display-6 fw-bold text-info mb-3">
                Ready to Get Started?
              </h3>
              <p className="lead text-secondary mb-4">
                Join our community of readers today and unlock a world of knowledge.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Link to="/register" className="btn btn-success btn-lg px-5">
                  Sign Up for Free
                </Link>
                <Link to="/login" className="btn btn-outline-info btn-lg px-5">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark border-top border-secondary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
              <p className="text-secondary mb-0">
                © 2024 E-Library. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="text-secondary text-decoration-none me-3 hover-info">Privacy Policy</a>
              <a href="#" className="text-secondary text-decoration-none hover-info">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

