const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/userController'); // Correct import
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', (req, res, next) => {
  console.log('POST /register');
  next();
}, registerUser);

router.post('/login', (req, res, next) => {
  console.log('POST /login');
  next();
}, authUser);

router.get('/profile', authMiddleware, (req, res, next) => {
  console.log('GET /profile');
  next();
}, getUserProfile);

module.exports = router;
