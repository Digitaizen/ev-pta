const express = require('express');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/volunteers/opportunities
// @desc    Get volunteer opportunities
// @access  Public
router.get('/opportunities', async (req, res) => {
  try {
    // Placeholder data
    const opportunities = [
      {
        id: 1,
        title: 'Event Setup Volunteer',
        description: 'Help set up for PTA events and meetings',
        timeCommitment: '2-3 hours per event',
        skills: ['Physical setup', 'Organization'],
        contact: 'events@eastviewpta.org'
      },
      {
        id: 2,
        title: 'Communications Team',
        description: 'Help with social media, newsletters, and website content',
        timeCommitment: '1-2 hours per week',
        skills: ['Writing', 'Social Media', 'Design'],
        contact: 'communications@eastviewpta.org'
      },
      {
        id: 3,
        title: 'Fundraising Committee',
        description: 'Assist with fundraising events and campaigns',
        timeCommitment: '3-4 hours per month',
        skills: ['Event planning', 'Sales', 'Organization'],
        contact: 'fundraising@eastviewpta.org'
      }
    ];

    res.json(opportunities);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/volunteers/signup
// @desc    Sign up to volunteer
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, interests, availability, message } = req.body;

    // Placeholder for volunteer signup processing
    // Here you would save to database and send notification emails

    res.json({
      success: true,
      message: 'Thank you for volunteering! We will contact you soon.'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
