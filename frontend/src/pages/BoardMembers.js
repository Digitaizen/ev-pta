import React from 'react';

const BoardMembers = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>PTA Board Members</h1>
          <p className="page-subtitle">
            Meet the dedicated volunteers who lead our East View High School PTA
          </p>
        </div>

        <div className="board-grid">
          <div className="board-member-card">
            <div className="member-photo">
              <img 
                src="/images/board/placeholder.jpg" 
                alt="Sarah Johnson" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="member-info">
              <h3>Sarah Johnson</h3>
              <h4>President</h4>
              <p>
                Sarah has been with the PTA for 5 years and is passionate about student success. 
                She brings extensive experience in event planning and community outreach.
              </p>
              <a href="mailto:president@eastviewpta.org" className="contact-link">
                president@eastviewpta.org
              </a>
            </div>
          </div>

          <div className="board-member-card">
            <div className="member-photo">
              <img 
                src="/images/board/placeholder.jpg" 
                alt="Mike Rodriguez" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="member-info">
              <h3>Mike Rodriguez</h3>
              <h4>Vice President</h4>
              <p>
                Mike brings 10 years of volunteer experience to the board. He specializes in 
                fundraising and community partnerships.
              </p>
              <a href="mailto:vp@eastviewpta.org" className="contact-link">
                vp@eastviewpta.org
              </a>
            </div>
          </div>

          <div className="board-member-card">
            <div className="member-photo">
              <img 
                src="/images/board/placeholder.jpg" 
                alt="Lisa Chen" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="member-info">
              <h3>Lisa Chen</h3>
              <h4>Secretary</h4>
              <p>
                Lisa manages all PTA communications and meeting minutes. She has a background 
                in education and parent advocacy.
              </p>
              <a href="mailto:secretary@eastviewpta.org" className="contact-link">
                secretary@eastviewpta.org
              </a>
            </div>
          </div>

          <div className="board-member-card">
            <div className="member-photo">
              <img 
                src="/images/board/placeholder.jpg" 
                alt="David Thompson" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="member-info">
              <h3>David Thompson</h3>
              <h4>Treasurer</h4>
              <p>
                David oversees all financial aspects of the PTA. With his accounting background, 
                he ensures transparency and fiscal responsibility.
              </p>
              <a href="mailto:treasurer@eastviewpta.org" className="contact-link">
                treasurer@eastviewpta.org
              </a>
            </div>
          </div>
        </div>

        <div className="board-info-section">
          <div className="row">
            <div className="col-6">
              <h2>Board Meetings</h2>
              <p>
                Board meetings are held on the first Tuesday of each month at 7:00 PM 
                in the school library. All PTA members are welcome to attend.
              </p>
              <ul>
                <li>Next Meeting: March 5, 2024</li>
                <li>Time: 7:00 PM - 8:30 PM</li>
                <li>Location: School Library</li>
              </ul>
            </div>
            <div className="col-6">
              <h2>Get Involved</h2>
              <p>
                Interested in joining the board or volunteering with the PTA? 
                We're always looking for dedicated parents and community members.
              </p>
              <a href="/volunteers" className="btn btn-primary">
                Volunteer Opportunities
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardMembers;
