const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

const authMiddleware = async (req, res, next) => {
  let token;

  console.log('Auth middleware invoked');

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token found:', token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have a JWT_SECRET in your .env file
      console.log('Token decoded:', decoded);
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User found:', req.user);
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.log('No token found');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = authMiddleware;
