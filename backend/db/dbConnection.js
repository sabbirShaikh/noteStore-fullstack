import mongoose from 'mongoose';
import { config } from 'dotenv'
config();

export default async function dbConnection() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}noteStore`);
    console.log("Database connected successfully...")
  } catch (error) {
    console.log("Database connection failed")
    console.log('Error =', error.message)
  }
}