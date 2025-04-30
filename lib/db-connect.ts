import mongoose from "mongoose"

const isConnectionString = () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable")
    }
    return process.env.MONGODB_URI
}

const connectDb = async () => {
    try {
        isConnectionString()
        await mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : "")
        console.log("connected to db")
    } catch (error) {
        console.error(error)
    }
}

export default connectDb 