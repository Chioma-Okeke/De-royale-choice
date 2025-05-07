import mongoose, { Model, Schema } from "mongoose"
import { ICategory } from "./types"

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true
    }
)

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model("Category", CategorySchema)
export default Category