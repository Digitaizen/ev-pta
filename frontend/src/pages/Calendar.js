import React from 'react';
import { Helmet } from 'react-helmet';
import Calendar from '../components/Calendar';

const CalendarPage = () => {
  return (
    <div className="calendar-page">
      <Helmet>
        <title>PTA Calendar - East View High School PTA</title>
        <meta name="description" content="View upcoming PTA events, meetings, and activities at East View High School. Stay connected with our community calendar." />
        <meta name="keywords" content="PTA calendar, East View High School events, PTA meetings, school activities, Georgetown Texas" />
      </Helmet>

      <div className="page-header">
        <div className="container">
          <h1>PTA Calendar</h1>
          <p className="page-description">
            Stay up-to-date with all PTA events, meetings, and school activities.
            Mark your calendars and join us in supporting our East View community!
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <Calendar />

          <div className="full-calendar-section">
            <h2>Full Calendar View</h2>
            <div className="calendar-embed">
              <iframe
                src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(process.env.REACT_APP_GOOGLE_CALENDAR_ID || 'ptaeastview@gmail.com')}&ctz=America%2FChicago&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=MONTH&height=600&wkst=1&bgcolor=%23ffffff`}
                style={{
                  border: 0,
                  width: '100%',
                  height: '600px',
                  frameBorder: 0,
                  scrolling: 'no'
                }}
                title="East View PTA Calendar"
              ></iframe>
            </div>
          </div>

          <div className="calendar-info">
            <div className="info-section">
              <h3>How to Stay Connected</h3>
              <ul>
                <li>
                  <strong>Subscribe to our Google Calendar:</strong> Click on any event to view it in Google Calendar, 
                  then add our calendar to your personal calendar to receive notifications.
                </li>
                <li>
                  <strong>Join our meetings:</strong> Most PTA meetings are hybrid (in-person and virtual). 
                  Meeting links will be included in event descriptions.
                </li>
                <li>
                  <strong>Get reminders:</strong> Follow us on social media for event reminders and updates.
                </li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Meeting Information</h3>
              <div className="meeting-details">
                <div className="meeting-item">
                  <h4>General PTA Meetings</h4>
                  <p>Open to all parents, teachers, and community members. Your voice matters!</p>
                </div>
                <div className="meeting-item">
                  <h4>Board Meetings</h4>
                  <p>Monthly board meetings to discuss PTA business and plan upcoming events.</p>
                </div>
                <div className="meeting-item">
                  <h4>Special Events</h4>
                  <p>Fundraisers, volunteer opportunities, and community building activities.</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Contact Us</h3>
              <p>
                Have questions about an event or want to suggest a new activity? 
                <br />
                Email us at <a href="mailto:ptaeastview@gmail.com">ptaeastview@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
