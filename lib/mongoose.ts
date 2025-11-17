// lib/mongoose.ts

import mongoose from 'mongoose';

// Variable to track the connection status
let isConnected = false; 

export const connectToDB = async () => {
  // Set mongoose to strict mode for queries
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    return console.log('ERROR: MONGODB_URI is not defined in .env.local');
  }

  // If we're already connected, don't try to connect again
  if (isConnected) {
    // console.log('=> using existing database connection');
    return;
  }

  // Try to connect to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'your-database-name', // <-- TODO: Change this to your DB name
      // These options are good defaults
      bufferCommands: false,
    });

    isConnected = true;
    console.log('=> new database connection established');
  } catch (error) {
    console.log('Error connecting to database:', error);
  }
};