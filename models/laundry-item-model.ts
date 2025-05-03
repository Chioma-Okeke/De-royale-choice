import mongoose, { Schema } from "mongoose";
import { ILaundryItem } from "./types";

export const LaundryItemSchema = new Schema(
    {
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        price: { type: String, required: true },
        total: { type: String, required: true }
    }
)

export default mongoose.model<ILaundryItem>("LaundryItem", LaundryItemSchema)