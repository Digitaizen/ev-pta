const express = require('express');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/store
// @desc    Get all store items
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    // Placeholder for store items
    const items = [
      {
        id: 1,
        name: 'East View PTA T-Shirt',
        description: 'Official East View High School PTA t-shirt',
        price: 15.00,
        category: 'apparel',
        image: '/images/pta-tshirt.jpg',
        inStock: true
      },
      {
        id: 2,
        name: 'School Spirit Mug',
        description: 'Show your East View pride with this ceramic mug',
        price: 12.00,
        category: 'accessories',
        image: '/images/spirit-mug.jpg',
        inStock: true
      }
    ];

    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/store/purchase
// @desc    Process store purchase
// @access  Public
router.post('/purchase', async (req, res) => {
  try {
    // Placeholder for payment processing
    const { items, paymentMethod, customerInfo } = req.body;

    // Here you would integrate with Stripe/PayPal
    // For now, return success response
    res.json({
      success: true,
      orderId: 'ORDER_' + Date.now(),
      message: 'Purchase processed successfully'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
