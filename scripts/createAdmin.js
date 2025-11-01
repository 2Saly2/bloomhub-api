import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../src/modules/auth/model/index.js';

// Load environment variables
dotenv.config();

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const adminData = {
      username: 'admin',
      email: 'admin@bloomhub.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      await mongoose.disconnect();
      return;
    }

    // Create new admin user
    const admin = new User(adminData);
    await admin.save();
    console.log('✅ Admin user created successfully');
    console.log('Email:', adminData.email);
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdminUser();