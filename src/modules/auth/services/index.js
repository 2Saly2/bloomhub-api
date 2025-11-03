// src/modules/auth/services/index.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/index.js';

/**
 * Register a new user
 * @param {Object} userData - { username, email, password, role }
 * @returns {Object} { user, token }
 */
export const registerUser = async (userData) => {
  const { username, email, password } = userData;
  // Force role to 'user' for public registration. Admins must be created via admin tools.
  const role = 'user';

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already registered');

  // Create and save the user (password hashing happens in pre-save hook)
  const user = new User({ username, email, password, role });
  await user.save();

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Return simplified response
  return { 
    user: { _id: user._id, username: user.username, email: user.email, role: user.role }, 
    token 
  };
};

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {Object} { user, token }
 */
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  // Compare plaintext password with hashed password in DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { 
    user: { _id: user._id, username: user.username, email: user.email, role: user.role }, 
    token 
  };
};
