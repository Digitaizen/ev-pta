import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Contact Information */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:ptaeastview@gmail.com" className="contact-link">
                  ptaeastview@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:+15124171329" className="contact-link">
                  (512) 417-1329
                </a>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span className="contact-text">
                  4490 E University Ave<br />
                  Georgetown, TX 78626
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/membership" className="footer-link">
                  Join PTA
                </Link>
              </li>
              <li>
                <Link to="/volunteers" className="footer-link">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link to="/board-members" className="footer-link">
                  Board Members
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="footer-link">
                  Scholarships
                </Link>
              </li>
            </ul>
          </div>

          {/* School Information */}
          <div className="footer-section">
            <h3 className="footer-title">East View High School</h3>
            <div className="school-info">
              <p className="school-description">
                Supporting our students, teachers, and community through 
                parent involvement and educational excellence.
              </p>
              <div className="school-links">
                <a 
                  href="https://evhs.georgetownisd.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="school-link"
                >
                  School Website
                </a>
                <a 
                  href="https://www.georgetownisd.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="school-link"
                >
                  Georgetown ISD
                </a>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="footer-section">
            <h3 className="footer-title">Stay Connected</h3>
            <div className="social-section">
              <div className="social-links">
                <a 
                  href="https://www.facebook.com/profile.php?id=61578221830917" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                {/* <a 
                  href="https://twitter.com/eastviewpta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a> */}
                <a 
                  href="https://www.instagram.com/ev_pta/profilecard/?igsh=dnAyNWp2dW95ajF4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
              <div className="newsletter-signup">
                <p className="newsletter-text">
                  Subscribe to our newsletter for updates
                </p>
                <form className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} East View High School PTA. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer-bottom-link">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="footer-bottom-link">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
