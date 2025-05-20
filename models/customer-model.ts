import mongoose, { model, Model, models, Schema } from "mongoose";
import { ICustomer } from "./types";

const CustomerSchema: Schema<ICustomer> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Customer: Model<ICustomer> = models.Customer || model<ICustomer>("Customer", CustomerSchema);

export default Customer;
