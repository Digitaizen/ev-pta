const { google } = require('googleapis');
const path = require('path');

class GoogleCalendarService {
  constructor() {
    this.calendar = null;
    this.calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    this.initializeCalendar();
  }

  initializeCalendar() {
    try {
      // Use API key for public calendar access
      const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

      if (!apiKey) {
        console.warn('Google Calendar API key not configured, calendar features will be disabled');
        return;
      }

      this.calendar = google.calendar({
        version: 'v3',
        auth: apiKey
      });
    } catch (error) {
      console.error('Failed to initialize Google Calendar service:', error);
      // Don't throw error, just log it so the app can still function
      console.warn('Calendar features will be disabled');
    }
  }

  async listEvents(options = {}) {
    try {
      if (!this.calendar) {
        console.warn('Google Calendar not initialized, returning empty events list');
        return [];
      }

      const {
        timeMin = new Date().toISOString(),
        timeMax,
        maxResults = 50,
        orderBy = 'startTime',
        singleEvents = true
      } = options;

      console.log('Fetching events from calendar:', this.calendarId);
      console.log('Time range:', { timeMin, timeMax });

      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin,
        timeMax,
        maxResults,
        singleEvents,
        orderBy
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching calendar events:', error.message);

      // More specific error handling
      if (error.code === 404) {
        throw new Error('Calendar not found. Please check the calendar ID and ensure it is public.');
      } else if (error.code === 403) {
        throw new Error('Access denied. Please check API key permissions and calendar visibility.');
      } else if (error.code === 400) {
        throw new Error('Bad request. Please check the calendar ID format.');
      } else {
        throw new Error('Failed to fetch calendar events: ' + error.message);
      }
    }
  }

  async createEvent(eventData) {
    try {
      const {
        title,
        description,
        startDateTime,
        endDateTime,
        location,
        attendees = []
      } = eventData;

      const event = {
        summary: title,
        description,
        location,
        start: {
          dateTime: startDateTime,
          timeZone: 'America/Chicago' // Adjust timezone as needed
        },
        end: {
          dateTime: endDateTime,
          timeZone: 'America/Chicago'
        },
        attendees: attendees.map(email => ({ email }))
      };

      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        resource: event
      });

      return response.data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  async updateEvent(eventId, eventData) {
    try {
      const {
        title,
        description,
        startDateTime,
        endDateTime,
        location,
        attendees = []
      } = eventData;

      const event = {
        summary: title,
        description,
        location,
        start: {
          dateTime: startDateTime,
          timeZone: 'America/Chicago'
        },
        end: {
          dateTime: endDateTime,
          timeZone: 'America/Chicago'
        },
        attendees: attendees.map(email => ({ email }))
      };

      const response = await this.calendar.events.update({
        calendarId: this.calendarId,
        eventId,
        resource: event
      });

      return response.data;
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw new Error('Failed to update calendar event');
    }
  }

  async deleteEvent(eventId) {
    try {
      await this.calendar.events.delete({
        calendarId: this.calendarId,
        eventId
      });

      return { success: true, message: 'Event deleted successfully' };
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw new Error('Failed to delete calendar event');
    }
  }

  async getEvent(eventId) {
    try {
      const response = await this.calendar.events.get({
        calendarId: this.calendarId,
        eventId
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching calendar event:', error);
      throw new Error('Failed to fetch calendar event');
    }
  }

  // Get upcoming events for the next 30 days
  async getUpcomingEvents(days = 30) {
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

    return this.listEvents({
      timeMin,
      timeMax,
      maxResults: 100
    });
  }

  // Get events for a specific date range
  async getEventsByDateRange(startDate, endDate) {
    return this.listEvents({
      timeMin: new Date(startDate).toISOString(),
      timeMax: new Date(endDate).toISOString(),
      maxResults: 100
    });
  }
}

module.exports = new GoogleCalendarService();
