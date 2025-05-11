import { IUser } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const UserSchema: Schema<IUser> = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        }, 
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["staff", "admin"]
        }
    }
)

const User: Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema)

export default User