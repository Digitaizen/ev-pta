import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UpcomingEvents.css';

const UpcomingEvents = ({ limit = 3, showViewAll = true }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      // Fetch directly from Google Calendar API
      try {
        const calendarId = 'ptaeastview@gmail.com';
        const apiKey = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;

        if (apiKey) {
          const timeMin = new Date().toISOString();
          const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

          const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

          const response = await fetch(url);
          const data = await response.json();

          if (data.items) {
            const formattedEvents = data.items.map(event => ({
              id: event.id,
              title: event.summary,
              description: event.description || '',
              start: event.start.dateTime || event.start.date,
              end: event.end.dateTime || event.end.date,
              location: event.location || '',
              htmlLink: event.htmlLink
            }));

            setEvents(formattedEvents);
            return;
          }
        }
      } catch (googleError) {
        console.warn('Google Calendar direct API failed:', googleError);
      }

      // If no real events found, show empty state instead of mock data
      setEvents([]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtmlTags = (html) => {
    if (!html) return '';
    // Create a temporary div to parse HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const renderDescription = (description) => {
    if (!description) return null;
    
    // Convert HTML to JSX-safe format
    const createMarkup = () => {
      return { __html: description };
    };
    
    return (
      <div 
        className="event-description" 
        dangerouslySetInnerHTML={createMarkup()}
      />
    );
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => new Date(event.start) >= now)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, limit);
  };

  if (loading) {
    return (
      <div className="upcoming-events-container">
        <div className="loading">Loading upcoming events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="upcoming-events-container">
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

  if (upcomingEvents.length === 0) {
    return (
      <div className="upcoming-events-container">
        <div className="no-events">
          <p>No upcoming events scheduled.</p>
          {showViewAll && (
            <Link to="/calendar" className="btn btn-primary">
              View Calendar
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="upcoming-events-container">
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
                {formatDate(event.start)} at {formatTime(event.start)}
                {event.end && ` - ${formatTime(event.end)}`}
              </p>
              {event.location && (
                <p className="event-location">📍 {event.location}</p>
              )}
              {event.description && (
                <div className="event-description-preview">
                  {renderDescription(event.description)}
                </div>
              )}
              {event.htmlLink && (
                <a 
                  href={event.htmlLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="event-link"
                >
                  View in Google Calendar
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showViewAll && (
        <div className="view-all-container">
          <Link to="/calendar" className="btn btn-primary">
            View All Events
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
