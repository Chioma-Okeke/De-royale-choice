import { ICustomer } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

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

const Customer: Model<ICustomer> = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema)

export default Customer;
