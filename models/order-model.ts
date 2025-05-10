import mongoose, { Model } from "mongoose"
import { LaundryItemSchema } from "./laundry-item-model"
import { IOrder } from "./types";
import Customer from "./customer-model";

const OrderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        laundryItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "LaundryItem", required: true }],
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