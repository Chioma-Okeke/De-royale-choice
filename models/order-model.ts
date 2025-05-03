import mongoose, { Model } from "mongoose"
import { LaundryItemSchema } from "./laundry-item-model"
import { IOrder } from "./types";

const OrderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,   
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        laundryItems: [LaundryItemSchema],
        totalAmount: {
            type: Number,
            required: true
        },
        receiptId: {type: String, required: true, unique: true},

    },
    {
        timestamps: true
    }
)

const Contact: Model<IOrder> =
    mongoose.models.Order ||
    mongoose.model<IOrder>("Order", OrderSchema);

export default Contact;