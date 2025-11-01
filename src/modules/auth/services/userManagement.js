import User from '../model/index.js';
import bcrypt from 'bcryptjs';

/**
 * Get all users (admin only)
 */
export const getAllUsers = async () => {
  return User.find().select('-password');
};

/**
 * Get user by ID (admin only)
 */
export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

/**
 * Create user (admin only)
 */
export const createUser = async (data) => {
  const { username, email, password, role } = data;
  
  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email already registered');

  const user = new User({ username, email, password, role });
  await user.save();
  
  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

/**
 * Update user (admin only)
 */
export const updateUser = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  // If updating email, check it's not taken
  if (data.email && data.email !== user.email) {
    const exists = await User.findOne({ email: data.email });
    if (exists) throw new Error('Email already taken');
  }

  // If updating password, hash it
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  Object.assign(user, data);
  await user.save();

  const updated = user.toObject();
  delete updated.password;
  return updated;
};

/**
 * Delete user (admin only)
 */
export const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  if (user.role === 'admin') throw new Error('Cannot delete admin users');
  
  await User.findByIdAndDelete(id);
  return { message: 'User deleted successfully' };
};