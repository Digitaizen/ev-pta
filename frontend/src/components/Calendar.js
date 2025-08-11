import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/calendar/events?days=30`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.events);
      } else {
        setError('Failed to fetch calendar events');
      }
    } catch (err) {
      setError('Error connecting to calendar service');
      console.error('Calendar fetch error:', err);
    } finally {
      setLoading(false);
    }
  };



  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => new Date(event.start) >= now)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 5);
  };



  if (loading) {
    return (
      <div className="calendar-container">
        <div className="loading">Loading calendar events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="calendar-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchEvents} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>PTA Calendar</h2>
        <button onClick={fetchEvents} className="refresh-btn">
          Refresh
        </button>
      </div>

      <div className="calendar-content">
        <div className="upcoming-events">
          <h3>Upcoming Events</h3>
          {upcomingEvents.length === 0 ? (
            <p className="no-events">No upcoming events scheduled.</p>
          ) : (
            <div className="events-list">
              {upcomingEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-date">
                    <div className="event-day">
                      {new Date(event.start).getDate()}
                    </div>
                    <div className="event-month">
                      {new Date(event.start).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                  <div className="event-details">
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-time">
                      {formatTime(event.start)}
                      {event.end && ` - ${formatTime(event.end)}`}
                    </p>
                    {event.location && (
                      <p className="event-location">📍 {event.location}</p>
                    )}
                    {event.description && (
                      <div
                        className="event-description"
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                    )}
                  </div>
                  {event.htmlLink && (
                    <div className="event-actions">
                      <a 
                        href={event.htmlLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-in-google-btn"
                      >
                        View in Google Calendar
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="calendar-summary">
          <h3>Calendar Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number">{events.length}</span>
              <span className="stat-label">Total Events</span>
            </div>
            <div className="stat">
              <span className="stat-number">{upcomingEvents.length}</span>
              <span className="stat-label">Upcoming</span>
            </div>
          </div>
          
          <div className="calendar-note">
            <p>
              <strong>Note:</strong> This calendar shows PTA events and meetings. 
              For the most up-to-date information, please check our Google Calendar directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
