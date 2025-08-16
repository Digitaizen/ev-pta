import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
import './CalendarEventsList.css';

const CalendarEventsList = ({ limit = 5, showViewAll = false }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Google Calendar API configuration
  const CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID || 'ptaeastview@gmail.com';
  const API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const fetchCalendarEvents = async () => {
    if (!API_KEY) {
      setError('Google Calendar API key not configured');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const now = new Date().toISOString();
      const maxResults = limit || 10;
      
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?` +
        `key=${API_KEY}&` +
        `timeMin=${now}&` +
        `maxResults=${maxResults}&` +
        `singleEvents=true&` +
        `orderBy=startTime`
      );

      if (!response.ok) {
        throw new Error(`Calendar API error: ${response.status}`);
      }

      const data = await response.json();
      setEvents(data.items || []);
    } catch (err) {
      setError('Failed to load calendar events');
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (event) => {
    const start = event.start?.dateTime || event.start?.date;
    if (!start) return 'Date TBD';

    const date = new Date(start);
    const isAllDay = !event.start?.dateTime;

    if (isAllDay) {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatEventTime = (event) => {
    const start = event.start?.dateTime;
    const end = event.end?.dateTime;
    
    if (!start || !end) return null;

    const startTime = new Date(start).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
    
    const endTime = new Date(end).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });

    return `${startTime} - ${endTime}`;
  };

  const getEventStatus = (event) => {
    const now = new Date();
    const start = new Date(event.start?.dateTime || event.start?.date);
    const end = new Date(event.end?.dateTime || event.end?.date);

    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'ongoing';
    return 'past';
  };

  if (loading) {
    return (
      <div className="calendar-events-list">
        <div className="loading">
          <FaCalendarAlt className="loading-icon" />
          <p>Loading upcoming events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="calendar-events-list">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchCalendarEvents} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="calendar-events-list">
        <div className="no-events">
          <FaCalendarAlt className="no-events-icon" />
          <h3>No Upcoming Events</h3>
          <p>Check back soon for new PTA events and activities!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-events-list">
      <div className="events-grid">
        {events.map((event, index) => (
          <div key={event.id || index} className={`event-card ${getEventStatus(event)}`}>
            <div className="event-date-badge">
              <div className="event-month">
                {new Date(event.start?.dateTime || event.start?.date).toLocaleDateString('en-US', { month: 'short' })}
              </div>
              <div className="event-day">
                {new Date(event.start?.dateTime || event.start?.date).getDate()}
              </div>
            </div>
            
            <div className="event-content">
              <h3 className="event-title">{event.summary || 'Untitled Event'}</h3>
              
              <div className="event-details">
                <div className="event-detail">
                  <FaCalendarAlt className="detail-icon" />
                  <span>{formatEventDate(event)}</span>
                </div>
                
                {formatEventTime(event) && (
                  <div className="event-detail">
                    <FaClock className="detail-icon" />
                    <span>{formatEventTime(event)}</span>
                  </div>
                )}
                
                {event.location && (
                  <div className="event-detail">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
              
              {event.description && (
                <p className="event-description">
                  {event.description.length > 150 
                    ? `${event.description.substring(0, 150)}...` 
                    : event.description
                  }
                </p>
              )}
              
              {event.htmlLink && (
                <a 
                  href={event.htmlLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="event-link"
                >
                  View in Google Calendar <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showViewAll && (
        <div className="view-all-container">
          <a
            href={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View Full Calendar
          </a>
        </div>
      )}
    </div>
  );
};

export default CalendarEventsList;
