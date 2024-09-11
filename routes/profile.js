const express = require('express');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();

// Create Profile
router.post('/createProfile', auth, async (req, res) => {
  const { email, username, gender, birthday, horoscope, zodiac, height, weight, interests } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    user.profile = { username, gender, birthday, horoscope, zodiac, height, weight, interests };
    await user.save();

    res.json(user.profile);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get Profile
router.get('/getProfile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update Profile
router.patch('/updateProfile', auth, async (req, res) => {
  const { username, gender, birthday, horoscope, zodiac, height, weight, interests } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    user.profile = { ...user.profile, username, gender, birthday, horoscope, zodiac, height, weight, interests };
    await user.save();

    res.json(user.profile);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
