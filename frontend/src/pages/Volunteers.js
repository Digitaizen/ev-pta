import React from 'react';

const Volunteers = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Volunteer Opportunities</h1>
          <p className="page-description">
            Get involved and make a difference in our school community
          </p>
        </div>

        <div className="volunteer-opportunities">
          <div className="opportunity-card">
            <h3>Event Setup Volunteer</h3>
            <p>Help set up for PTA events and meetings</p>
            <div className="opportunity-details">
              <span className="time-commitment">2-3 hours per event</span>
              <span className="skills">Physical setup, Organization</span>
            </div>
            <button className="btn btn-primary">Sign Up</button>
          </div>

          <div className="opportunity-card">
            <h3>Communications Team</h3>
            <p>Help with social media, newsletters, and website content</p>
            <div className="opportunity-details">
              <span className="time-commitment">1-2 hours per week</span>
              <span className="skills">Writing, Social Media, Design</span>
            </div>
            <button className="btn btn-primary">Sign Up</button>
          </div>

          <div className="opportunity-card">
            <h3>Fundraising Committee</h3>
            <p>Assist with fundraising events and campaigns</p>
            <div className="opportunity-details">
              <span className="time-commitment">3-4 hours per month</span>
              <span className="skills">Event planning, Sales, Organization</span>
            </div>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
