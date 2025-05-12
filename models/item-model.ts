import mongoose, {Model, Schema} from "mongoose"
import { IItem } from "./types";


const ItemSchema = new Schema(
    {
        itemName: {
            type: String,
            required: true,
        },
        itemPrice: {
            type: Number,
            required: true
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    }
)

ItemSchema.index(
    { itemName: 1, categoryId: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
  );

const Item: Model<IItem> = mongoose.models.Item || mongoose.model("Item", ItemSchema)
export default Item