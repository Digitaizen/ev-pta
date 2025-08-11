import React from 'react';
import { Link } from 'react-router-dom';

const Membership = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Join the East View PTA</h1>
          <p className="page-subtitle">
            Become part of our community and help support our students and teachers
          </p>
        </div>

        <div className="membership-benefits">
          <h2>Membership Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Support Student Programs</h3>
              <p>Your membership directly funds educational programs, field trips, and student activities.</p>
            </div>
            <div className="benefit-card">
              <h3>Have a Voice</h3>
              <p>Participate in school decisions and help shape policies that affect our children.</p>
            </div>
            <div className="benefit-card">
              <h3>Connect with Community</h3>
              <p>Meet other parents and families who share your commitment to education.</p>
            </div>
            <div className="benefit-card">
              <h3>Member-Only Events</h3>
              <p>Access to exclusive PTA events and early registration for popular activities.</p>
            </div>
          </div>
        </div>

        <div className="membership-types">
          <h2>Membership Options</h2>
          <div className="membership-cards">
            <div className="membership-card featured">
              <h3>Individual</h3>
              <div className="price">$10</div>
              <p>Single parent/guardian/student membership</p>
              <Link to="/register" className="btn btn-primary">Join Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
