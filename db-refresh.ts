import connectDb, { disconnectDb } from './lib/db-connect';
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

async function refreshDatabase() {
  try {
    await connectDb();
    const collections = await mongoose.connection.db?.collections();

    if (collections?.length === 0) {
      console.log('ℹ️ No collections found to drop.');
    }

    if (collections) {
      for (const collection of collections) {
        console.log(`🗑️ Dropping collection: ${collection.collectionName}`);
        await collection.drop().catch((err) => {
          if (err.message === 'ns not found') return;
          throw err;
        });
      }
    }

    console.log('✅ All collections dropped successfully.');
  } catch (err: any) {
    console.error('❌ Failed to drop collections:', err.message);
  } finally {
    await disconnectDb()
    process.exit();
  }
}

refreshDatabase();
