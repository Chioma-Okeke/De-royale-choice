import mongoose, { Document } from "mongoose";

export interface ICustomer extends Document {
    name: string
    phoneNumber: string
    address: string
    orders?: mongoose.Schema.Types.ObjectId[]
}

export interface IUser extends Document {
    email: string
    password: string
    role: "staff" | "admin"
}

export interface IGetCustomerResponse {
  name: string
  phoneNumber: string
  address: string
  orders: string[] //array of order IDs
}

export interface IGetCategoriesResponse {
  _id: string;
  name: string;
  items: number;
}

export interface Category {
  name: string
  item: string
  id: string
}

export interface IGetItemsResponse {
  _id: string
  itemName: string
  categoryName: string
  itemPrice: number
}

export interface ICreateItemRequest {
  itemName: string
  categoryId: string
  itemPrice: number
}
