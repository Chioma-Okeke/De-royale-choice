import mongoose from "mongoose";
import { isConnectionString } from "./utils";

const connectDb = async () => {
    const mongoURI = isConnectionString();

    if (mongoose.connection.readyState === 1) {
        console.log("Connection exists", mongoose.connection.name);
        return;
    }

    try {
        await mongoose.connect(mongoURI, {
            dbName: "de-royale-choice",
        });
        console.log("connected to db", mongoose.connection.name);
    } catch (error) {
        console.error(error);
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
