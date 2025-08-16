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
      setError(null);
      console.log('Starting to fetch calendar events...');

      // Fetch directly from Google Calendar API
      try {
        const calendarId = process.env.REACT_APP_GOOGLE_CALENDAR_ID || 'ptaeastview@gmail.com';
        const apiKey = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
        console.log('Trying Google Calendar API with key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'Missing');
        console.log('Calendar ID:', calendarId);

        if (apiKey) {
          // Use Google Calendar API directly from frontend for public calendars
          // Get events from yesterday to 90 days in the future to catch events that might be today
          const timeMin = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Start from yesterday
          const timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(); // 90 days from now

          const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=50`;
          console.log('Google Calendar API URL (without key):', url.replace(apiKey, 'API_KEY_HIDDEN'));

          const response = await fetch(url);
          console.log('Google Calendar response status:', response.status);
          console.log('Google Calendar response headers:', Object.fromEntries(response.headers.entries()));

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Google Calendar API error response:', errorText);

            // Try to parse error details
            try {
              const errorData = JSON.parse(errorText);
              console.error('Parsed error data:', errorData);
              if (errorData.error && errorData.error.message) {
                throw new Error(`Google Calendar API error: ${errorData.error.message}`);
              }
            } catch (parseError) {
              // If we can't parse the error, use the raw text
            }

            throw new Error(`Google Calendar API error! status: ${response.status}, response: ${errorText}`);
          }

          const data = await response.json();
          console.log('Google Calendar response data:', data);

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

            console.log('Successfully loaded events from Google Calendar:', formattedEvents.length);
            setEvents(formattedEvents);
            return;
          } else {
            console.log('Google Calendar returned no events in the specified time range');
            console.log('Time range:', { timeMin, timeMax });
          }
        } else {
          console.warn('Google Calendar API key not found in environment variables');
        }
      } catch (googleError) {
        console.error('Google Calendar direct API failed:', googleError);
        console.error('Error details:', {
          message: googleError.message,
          stack: googleError.stack
        });
      }

      // If we get here, no events were found
      console.warn('No calendar events found from Google Calendar API');
      setEvents([]);

    } catch (err) {
      console.error('Critical error in fetchEvents:', err);
      setError('Failed to load calendar events');
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
    // Get events from the start of today onwards
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    return events
      .filter(event => new Date(event.start) >= startOfToday)
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
