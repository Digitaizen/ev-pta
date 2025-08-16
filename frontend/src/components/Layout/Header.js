import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo and School Info */}
          <div className="header-brand">
            <Link to="/" className="brand-link" onClick={closeMenu}>
              <div className="logo-container">
                <img
                  src={`${process.env.PUBLIC_URL}/ev_pta_logo_1024.png`}
                  alt="East View High School PTA"
                  className="school-logo"
                  onError={(e) => {
                    console.log('Logo failed to load:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                />
                <div className="brand-text">
                  <h1 className="school-name">East View High School</h1>
                  <p className="pta-text">Parent Teacher Association</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/board-members" className="nav-link" onClick={closeMenu}>
                  Board Members
                </Link>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle">
                  Shop
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/store" className="dropdown-link" onClick={closeMenu}>
                      Store
                    </Link>
                  </li>
                  <li>
                    <Link to="/spiritwear" className="dropdown-link" onClick={closeMenu}>
                      Spiritwear
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/membership" className="nav-link" onClick={closeMenu}>
                  Membership
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link" onClick={closeMenu}>
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/calendar" className="nav-link" onClick={closeMenu}>
                  Calendar
                </Link>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle">
                  Get Involved
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/volunteers" className="dropdown-link" onClick={closeMenu}>
                      Volunteers
                    </Link>
                  </li>
                  <li>
                    <Link to="/community-partners" className="dropdown-link" onClick={closeMenu}>
                      Community Partners
                    </Link>
                  </li>
                  <li>
                    <Link to="/scholarships" className="dropdown-link" onClick={closeMenu}>
                      Scholarships
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Auth Section */}
            <div className="auth-section">
              {isAuthenticated ? (
                <div className="user-menu">
                  <span className="welcome-text">
                    Welcome, {user?.firstName}
                  </span>
                  <Link to="/dashboard" className="btn btn-outline btn-sm" onClick={closeMenu}>
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-primary btn-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="btn btn-outline btn-sm" onClick={closeMenu}>
                    Login
                  </Link>
                  <a href="https://www.joinpta.org/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" onClick={closeMenu}>
                    Join PTA
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
