import mongoose, { Document } from "mongoose";

export interface ICustomer extends Document {
    name: string
    phoneNumber: string
    orders: mongoose.Schema.Types.ObjectId[]
}

export interface IUser extends Document {
    email: string
    password: string
    role: "staff" | "admin"
}