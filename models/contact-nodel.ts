import mongoose, { Model } from "mongoose";
import { IContact } from "./types";

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Contact: Model<IContact> =
    mongoose.models.Contact ||
    mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
