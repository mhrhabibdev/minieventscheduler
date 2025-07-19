import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import app from './app'; // assuming app.ts exports Express app
import cors from 'cors';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("✅ Database connected");

    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect database or start server", err);
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`😈 unhandledRejection is detected, shutting down...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`😈 uncaughtException is detected, shutting down...`, err);
  process.exit(1);
});
