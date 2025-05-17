const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// GitHub Authentication Routes
router.get('/github', passport.authenticate('github', { session: false }));

router.get('/github/callback', 
  passport.authenticate('github', { 
    session: false,
    failureRedirect: '/login' 
  }),
  async (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      // Set cookie and redirect
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      res.redirect(process.env.FRONTEND_URL);
    } catch (error) {
      console.error('GitHub auth error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=github_auth_failed`);
    }
  }
);

// Logout route
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
