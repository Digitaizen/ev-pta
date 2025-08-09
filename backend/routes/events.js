const express = require('express');
const Event = require('../models/Event');
const { auth, adminAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all published events
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { start, end, category } = req.query;
    let query = { status: 'published' };

    // Date range filter
    if (start || end) {
      query.startDate = {};
      if (start) query.startDate.$gte = new Date(start);
      if (end) query.startDate.$lte = new Date(end);
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    const events = await Event.find(query)
      .populate('organizer', 'firstName lastName')
      .sort({ startDate: 1 });

    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin/Board)
router.post('/', auth, async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.user.id
    };

    const event = new Event(eventData);
    await event.save();
    await event.populate('organizer', 'firstName lastName');

    res.status(201).json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Private
router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    const existingRegistration = event.attendees.find(
      attendee => attendee.user.toString() === req.user.id
    );

    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check if event is full
    if (event.isFull) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.attendees.push({
      user: req.user.id,
      status: 'registered'
    });

    await event.save();

    res.json({ message: 'Successfully registered for event', event });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
