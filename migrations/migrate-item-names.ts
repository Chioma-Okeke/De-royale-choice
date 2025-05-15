import mongoose from 'mongoose'
import Item from '../models/item-model'
import LaundryItem from '../models/laundry-item-model'
import 'dotenv/config'

async function migrateItemNames() {
    await mongoose.connect(process.env.MONGODB_URI!)

  const items = await Item.find().lean()
  const itemMap = new Map(items.map(item => [item._id.toString(), item.itemName]))

  const laundryItems = await LaundryItem.find()

  for (const laundryItem of laundryItems) {
    const itemName = itemMap.get(laundryItem.itemId.toString())
    if (!itemName) continue

    laundryItem.itemName = itemName
    await laundryItem.save()
  }

  console.log('Migration complete')
  await mongoose.disconnect()
}

migrateItemNames().catch((err) => {
    console.error('Migration failed:', err)
    mongoose.disconnect()
})