import mongoose from "mongoose";
import Contact from "./models/contact-nodel";
import dotenv from "dotenv"
import { isConnectionString } from "./lib/utils";
import connectDb, { disconnectDb } from "./lib/db-connect";

dotenv.config()

async function migrateEmailToPhoneNumber() {
    try {
        await connectDb()
        const result = await Contact.updateMany(
            {email: {$exists: true}},
            [
                {
                    $set: {
                        phoneNumber: "$email",
                    },
                },
                {
                    $unset: "email"
                }
            ]
        )
        console.log("Migration completed:", result.modifiedCount, "documents, updated.")
    } catch (error) {
        console.error("Migration failed:", error)
    } finally {
        await disconnectDb()
        console.log("Disconnected from MongoDB")
    }
}

migrateEmailToPhoneNumber()