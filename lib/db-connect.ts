import mongoose from "mongoose"
import { isConnectionString } from "./utils"


const connectDb = async () => {
    try {
        const mongoURI = isConnectionString()
        await mongoose.connect(mongoURI)
        console.log("connected to db")
    } catch (error) {
        console.error(error)
    }
}

export const disconnectDb = async () => {
    try {
        await mongoose.disconnect()
    } catch (error) {
        console.log("Error when diconnecting mongo", error)
    }
}

export default connectDb 