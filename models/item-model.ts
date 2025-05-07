import mongoose, {Model, Schema} from "mongoose"
import { IItem } from "./types";


const ItemSchema = new Schema(
    {
        itemName: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true
        },
        CategoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    }
)

const Item: Model<IItem> = mongoose.models.Item || mongoose.model("Item", ItemSchema)
export default Item