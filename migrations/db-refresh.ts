import mongoose from 'mongoose'

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/de-royale-choice'

async function refreshDatabase() {
  try {
    await mongoose.connect(DB_URI)
    const collections = await mongoose.connection.db?.collections()

    if (!collections) {
        console.log("No collections found")
        return
    }

    for (let collection of collections) {
      console.log(`Dropping: ${collection.collectionName}`)
      await collection.drop()
    }

    console.log('✅ All collections dropped.')
    process.exit(0)
  } catch (err: any) {
    console.error('❌ Failed to drop collections:', err.message)
    process.exit(1)
  }
}

refreshDatabase()
