import mongoose, { Model, Schema } from "mongoose";
import { ILaundryItem } from "./types";

export const LaundryItemSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, {
    timestamps: true
});

const LaundryItem: Model<ILaundryItem> =
    mongoose.models.LaundryItem || mongoose.model("LaundryItem", LaundryItemSchema);

export default LaundryItem;
