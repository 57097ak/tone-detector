const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  console.log('Register user called with data:', req.body);
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log('User already exists:', email);
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    console.log('User created:', user);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    console.log('Invalid user data:', req.body);
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const authUser = async (req, res) => {
  console.log('Auth user called with data:', req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    console.log('User authenticated:', user);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    console.log('Invalid email or password:', req.body);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getUserProfile = async (req, res) => {
  console.log('Get user profile called for user:', req.user);
  const user = await User.findById(req.user._id);

  if (user) {
    console.log('User profile found:', user);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    console.log('User not found:', req.user);
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, authUser, getUserProfile };
