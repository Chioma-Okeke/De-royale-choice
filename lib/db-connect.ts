import mongoose from "mongoose";
import { isConnectionString } from "./utils";

let isConnected: boolean = false;

export const connectDb = async () => {
    if (isConnected) {
        return;
    }

    const mongoURI = isConnectionString();

    if (mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }

    try {
        await mongoose.connect(mongoURI, {
            dbName: "de-royale-choice",
        });

        isConnected = true;
        console.log("✅ Connected to DB:", mongoose.connection.name);
    } catch (error) {
        console.error("❌ DB connection error:", error);
    }
};

export const disconnectDb = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log("Error when diconnecting mongo", error);
    }
};

export default connectDb;
