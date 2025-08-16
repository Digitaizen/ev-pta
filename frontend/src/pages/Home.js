import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaHeart, FaGraduationCap } from 'react-icons/fa';
import CalendarEventsList from '../components/CalendarEventsList';

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
                <a href="https://www.joinpta.org/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Join Our PTA
                </a>
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
                {/* <div className="announcement-card">
                  <div className="announcement-date">Aug 10, 2025</div>
                  <h3 className="announcement-title">Spring Fundraiser Coming Soon!</h3>
                  <p className="announcement-content">
                    Join us for our annual spring fundraiser on March 15th. Help us raise funds 
                    for new technology and student programs.
                  </p>
                  <Link to="/blog" className="announcement-link">Read More</Link>
                </div> */}
                <div className="announcement-card">
                  <div className="announcement-date">Aug 10, 2025</div>
                  <h3 className="announcement-title">New Member Meeting</h3>
                  <p className="announcement-content">
                    Anyone interested in the school and students is welcome to attend and join.
                    <br />
                      Join the EVHS PTA!
                      <br />
                      Attention all parents and Teachers. We are starting a PTA at EVHS!
                      <br />
                      A meeting to organize our PTA will be held virtually on Monday August 11th at 6pm.
                      Please use this link to attend:
                      <br />
                      <a href="https://us06web.zoom.us/j/84487754793?pwd=i9dHgkcZ3xH1dtb9CIt34Bkbpf4D6m.1" target="_blank" rel="noreferrer">
                          Join Zoom Meeting
                      </a>
                  </p>
                  {/* <Link to="/blog" className="announcement-link">Read More</Link> */}
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
                      <a href="https://www.joinpta.org/" target="_blank" rel="noopener noreferrer" className="quick-action-btn">
                        <FaUsers />
                        Join PTA
                      </a>
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
          <CalendarEventsList limit={3} showViewAll={true} />
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h2>Get In Touch</h2>
              <div className="contact-info">
                <p><strong>Email:</strong> ptaeastview@gmail.com</p>
                <p><strong>Phone:</strong> (512) 417-1329</p>
                <p><strong>Address:</strong> 4490 E University Ave, Georgetown, TX 78626</p>
              </div>
            </div>
            <div className="col-6">
              <h2>Follow Us</h2>
              <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=61578221830917" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                {/* <a href="https://twitter.com/eastviewpta" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a> */}
                <a href="https://www.instagram.com/ev_pta/profilecard/?igsh=dnAyNWp2dW95ajF4" target="_blank" rel="noopener noreferrer">
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
