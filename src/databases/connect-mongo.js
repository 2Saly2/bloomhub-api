import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectMongo() {
  const url = process.env.MONGO_URL;
  if (!url) throw new Error('MONGO_URL is not set in .env');
  await mongoose.connect(url);
  console.log('✅ MongoDB connected');
}
