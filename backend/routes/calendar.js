const express = require('express');
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const googleCalendarService = require('../services/googleCalendar');
const { auth } = require('../middleware/auth');

// Validation middleware
const validateEvent = [
  body('title').notEmpty().withMessage('Title is required'),
  body('startDateTime').isISO8601().withMessage('Valid start date/time is required'),
  body('endDateTime').isISO8601().withMessage('Valid end date/time is required'),
  body('description').optional().isString(),
  body('location').optional().isString(),
  body('attendees').optional().isArray()
];

const validateDateRange = [
  query('startDate').optional().isISO8601().withMessage('Valid start date is required'),
  query('endDate').optional().isISO8601().withMessage('Valid end date is required'),
  query('days').optional().isInt({ min: 1, max: 365 }).withMessage('Days must be between 1 and 365')
];

// GET /api/calendar/events - Get calendar events
router.get('/events', validateDateRange, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }



    const { startDate, endDate, days } = req.query;
    let events;

    if (startDate && endDate) {
      // Get events for specific date range
      events = await googleCalendarService.getEventsByDateRange(startDate, endDate);
    } else if (days) {
      // Get upcoming events for specified number of days
      events = await googleCalendarService.getUpcomingEvents(parseInt(days));
    } else {
      // Get upcoming events for next 30 days (default)
      events = await googleCalendarService.getUpcomingEvents();
    }

    // Transform events to a consistent format
    const formattedEvents = events.map(event => ({
      id: event.id,
      title: event.summary,
      description: event.description || '',
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      location: event.location || '',
      attendees: event.attendees || [],
      htmlLink: event.htmlLink,
      created: event.created,
      updated: event.updated
    }));

    res.json({
      success: true,
      events: formattedEvents,
      count: formattedEvents.length
    });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      message: 'Failed to fetch calendar events',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? {
        code: error.code,
        status: error.status
      } : undefined
    });
  }
});

// GET /api/calendar/events/:id - Get specific event
router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await googleCalendarService.getEvent(id);

    const formattedEvent = {
      id: event.id,
      title: event.summary,
      description: event.description || '',
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      location: event.location || '',
      attendees: event.attendees || [],
      htmlLink: event.htmlLink,
      created: event.created,
      updated: event.updated
    };

    res.json({
      success: true,
      event: formattedEvent
    });
  } catch (error) {
    console.error('Error fetching calendar event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch calendar event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/calendar/events - Create new event (requires authentication)
router.post('/events', auth, validateEvent, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventData = {
      title: req.body.title,
      description: req.body.description,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      location: req.body.location,
      attendees: req.body.attendees
    };

    const event = await googleCalendarService.createEvent(eventData);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: {
        id: event.id,
        title: event.summary,
        htmlLink: event.htmlLink
      }
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create calendar event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/calendar/events/:id - Update event (requires authentication)
router.put('/events/:id', auth, validateEvent, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      location: req.body.location,
      attendees: req.body.attendees
    };

    const event = await googleCalendarService.updateEvent(id, eventData);

    res.json({
      success: true,
      message: 'Event updated successfully',
      event: {
        id: event.id,
        title: event.summary,
        htmlLink: event.htmlLink
      }
    });
  } catch (error) {
    console.error('Error updating calendar event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update calendar event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE /api/calendar/events/:id - Delete event (requires authentication)
router.delete('/events/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await googleCalendarService.deleteEvent(id);

    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete calendar event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/calendar/test - Test calendar configuration
router.get('/test', async (req, res) => {
  try {
    const { google } = require('googleapis');

    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!apiKey) {
      return res.json({
        success: false,
        message: 'Google Calendar API key not configured',
        config: {
          hasApiKey: false,
          calendarId: calendarId || 'not set'
        }
      });
    }

    // Test with a simple calendar list request first
    const calendar = google.calendar({ version: 'v3', auth: apiKey });

    // Try to get calendar metadata
    try {
      const calendarInfo = await calendar.calendars.get({
        calendarId: calendarId
      });

      res.json({
        success: true,
        message: 'Calendar configuration test successful',
        config: {
          hasApiKey: true,
          calendarId: calendarId,
          calendarName: calendarInfo.data.summary,
          calendarDescription: calendarInfo.data.description,
          timeZone: calendarInfo.data.timeZone
        }
      });
    } catch (calendarError) {
      res.json({
        success: false,
        message: 'Calendar access test failed',
        error: calendarError.message,
        config: {
          hasApiKey: true,
          calendarId: calendarId,
          errorCode: calendarError.code,
          errorStatus: calendarError.status
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Calendar test failed',
      error: error.message
    });
  }
});

module.exports = router;
