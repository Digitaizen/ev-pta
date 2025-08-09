const express = require('express');
const BlogPost = require('../models/BlogPost');
const { auth, adminAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all published blog posts
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find({ status: 'published' })
      .populate('author', 'firstName lastName')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments({ status: 'published' });

    res.json({
      posts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog
// @desc    Create a new blog post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, excerpt, tags, categories } = req.body;

    const post = new BlogPost({
      title,
      content,
      excerpt,
      author: req.user.id,
      tags: tags || [],
      categories: categories || [],
      status: req.user.role === 'admin' ? 'published' : 'pending'
    });

    await post.save();
    await post.populate('author', 'firstName lastName');

    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/pending
// @desc    Get pending blog posts (admin only)
// @access  Private (Admin)
router.get('/pending', adminAuth, async (req, res) => {
  try {
    const posts = await BlogPost.find({ status: 'pending' })
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/:id/approve
// @desc    Approve a blog post (admin only)
// @access  Private (Admin)
router.put('/:id/approve', adminAuth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    post.status = 'published';
    post.publishedAt = new Date();
    await post.save();

    res.json({ message: 'Blog post approved and published', post });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
