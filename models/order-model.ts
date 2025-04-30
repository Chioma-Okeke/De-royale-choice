import mongoose from "mongoose"

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
        itemDescription: {
            type: String,
            required: true
        }
    }
)