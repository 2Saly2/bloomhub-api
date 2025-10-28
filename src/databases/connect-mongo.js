import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
}
