import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaHeart, FaGraduationCap } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Welcome to East View High School PTA
              </h1>
              <p className="hero-subtitle">
                Supporting our students, teachers, and community in Georgetown, Texas
              </p>
              <div className="hero-buttons">
                <Link to="/membership" className="btn btn-primary">
                  Join Our PTA
                </Link>
                <Link to="/volunteers" className="btn btn-secondary">
                  Volunteer Today
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="/images/school-hero.jpg" 
                alt="East View High School" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Active Members</p>
            </div>
            <div className="stat-card">
              <FaCalendarAlt className="stat-icon" />
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Events This Year</p>
            </div>
            <div className="stat-card">
              <FaHeart className="stat-icon" />
              <h3 className="stat-number">$25K+</h3>
              <p className="stat-label">Funds Raised</p>
            </div>
            <div className="stat-card">
              <FaGraduationCap className="stat-icon" />
              <h3 className="stat-number">1,800+</h3>
              <p className="stat-label">Students Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="announcements-section">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <h2>Latest Announcements</h2>
              <div className="announcements-list">
                <div className="announcement-card">
                  <div className="announcement-date">Feb 15, 2024</div>
                  <h3 className="announcement-title">Spring Fundraiser Coming Soon!</h3>
                  <p className="announcement-content">
                    Join us for our annual spring fundraiser on March 15th. Help us raise funds 
                    for new technology and student programs.
                  </p>
                  <Link to="/blog" className="announcement-link">Read More</Link>
                </div>
                <div className="announcement-card">
                  <div className="announcement-date">Feb 10, 2024</div>
                  <h3 className="announcement-title">New Member Meeting</h3>
                  <p className="announcement-content">
                    New member orientation meeting scheduled for February 20th at 7 PM in the 
                    school library. Light refreshments will be provided.
                  </p>
                  <Link to="/blog" className="announcement-link">Read More</Link>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link to="/blog" className="btn btn-outline">View All News</Link>
              </div>
            </div>
            <div className="col-4">
              <div className="sidebar">
                <div className="card">
                  <div className="card-header">
                    <h3>Quick Actions</h3>
                  </div>
                  <div className="card-body">
                    <div className="quick-actions">
                      <Link to="/membership" className="quick-action-btn">
                        <FaUsers />
                        Join PTA
                      </Link>
                      <Link to="/volunteers" className="quick-action-btn">
                        <FaHeart />
                        Volunteer
                      </Link>
                      <Link to="/store" className="quick-action-btn">
                        <FaCalendarAlt />
                        Shop Store
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card mt-4">
                  <div className="card-header">
                    <h3>Best Supporter</h3>
                  </div>
                  <div className="card-body text-center">
                    <img 
                      src="/images/supporters/gcb-logo.jpg" 
                      alt="Georgetown Community Bank" 
                      className="supporter-logo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <h4>Georgetown Community Bank</h4>
                    <p>Proud supporter of East View High School PTA</p>
                    <Link to="/community-partners" className="btn btn-sm btn-outline">
                      View All Supporters
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="calendar-section">
        <div className="container">
          <h2 className="text-center mb-4">Upcoming Events</h2>
          <div className="calendar-placeholder">
            <p className="text-center">
              Calendar integration will be implemented here.
              <br />
              <Link to="/events" className="btn btn-primary mt-3">
                View All Events
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h2>Get In Touch</h2>
              <div className="contact-info">
                <p><strong>Email:</strong> info@eastviewpta.org</p>
                <p><strong>Phone:</strong> (512) 555-0123</p>
                <p><strong>Address:</strong> 4490 E University Ave, Georgetown, TX 78626</p>
              </div>
            </div>
            <div className="col-6">
              <h2>Follow Us</h2>
              <div className="social-links">
                <a href="https://facebook.com/eastviewpta" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                <a href="https://twitter.com/eastviewpta" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
                <a href="https://instagram.com/eastviewpta" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
