const express = require('express');
const { adminAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/content/:page
// @desc    Get page content
// @access  Public
router.get('/:page', optionalAuth, async (req, res) => {
  try {
    const { page } = req.params;

    // Placeholder content for different pages
    const content = {
      home: {
        hero: {
          title: 'Welcome to East View High School PTA',
          subtitle: 'Supporting our students, teachers, and community in Georgetown, Texas',
          image: '/images/school-hero.jpg'
        },
        announcements: [
          {
            id: 1,
            title: 'Spring Fundraiser Coming Soon!',
            content: 'Join us for our annual spring fundraiser on March 15th.',
            date: '2024-02-15',
            priority: 'high'
          },
          {
            id: 2,
            title: 'New Member Meeting',
            content: 'New member orientation meeting scheduled for February 20th at 7 PM.',
            date: '2024-02-10',
            priority: 'medium'
          }
        ],
        bestSupporter: {
          name: 'Georgetown Community Bank',
          logo: '/images/supporters/gcb-logo.jpg',
          description: 'Proud supporter of East View High School PTA'
        }
      },
      'board-members': {
        title: 'PTA Board Members',
        members: [
          {
            name: 'Sarah Johnson',
            position: 'President',
            email: 'president@eastviewpta.org',
            bio: 'Sarah has been with the PTA for 5 years and is passionate about student success.',
            image: '/images/board/sarah-johnson.jpg'
          },
          {
            name: 'Mike Rodriguez',
            position: 'Vice President',
            email: 'vp@eastviewpta.org',
            bio: 'Mike brings 10 years of volunteer experience to the board.',
            image: '/images/board/mike-rodriguez.jpg'
          }
        ]
      },
      membership: {
        title: 'Join the East View PTA',
        benefits: [
          'Support student programs and activities',
          'Have a voice in school decisions',
          'Connect with other parents and families',
          'Access to member-only events'
        ],
        membershipTypes: [
          {
            type: 'Individual',
            price: 15,
            description: 'Single parent/guardian membership'
          },
          {
            type: 'Family',
            price: 25,
            description: 'Household membership for all family members'
          },
          {
            type: 'Business',
            price: 100,
            description: 'Business supporter membership'
          }
        ]
      }
    };

    res.json(content[page] || { message: 'Page content not found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/content/:page
// @desc    Update page content (admin only)
// @access  Private (Admin)
router.put('/:page', adminAuth, async (req, res) => {
  try {
    const { page } = req.params;
    const { content } = req.body;

    // Placeholder for content update
    // Here you would save to database

    res.json({
      success: true,
      message: `${page} content updated successfully`
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
