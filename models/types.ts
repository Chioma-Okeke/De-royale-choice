// Define TypeScript types for our models

import mongoose from "mongoose"
import { Document } from "mongoose"

export interface IUser extends Document {
    email: string;
    password: string;
    role: "staff" | "admin";
}

export interface Customer {
  id: string
  name: string
  phone: string
  address?: string
  registrations: string[] // Array of registration IDs
  createdAt: Date
  updatedAt: Date
}

export interface ICategory extends Document {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface IItem extends Document{
  itemName: string
  categoryId: string
  itemPrice: number
  createdAt: Date
  updatedAt: Date
}

export interface LaundryItem {
  id: string
  registrationId: string
  itemId: string
  description: string
  quantity: number
  price: number
  totalPrice: number
  createdAt: Date
  updatedAt: Date
}

export type RegistrationStatus = "registered" | "processing" | "completed" | "delivered" | "cancelled"

export interface Registration {
  id: string
  registrationNumber: string // REG-XXXX format
  customerId: string
  customerName: string // Denormalized for convenience
  customerPhone: string // Denormalized for convenience
  items: LaundryItem[]
  totalItems: number
  totalAmount: number
  status: RegistrationStatus
  dropOffDate: Date
  pickupDate?: Date
  handledBy: string // User ID of staff who created the registration
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Tag {
  id: string
  registrationId: string
  registrationNumber: string // Denormalized for convenience
  customerName: string // Denormalized for convenience
  tagNumber: number // e.g., 1, 2, 3...
  totalTags: number // e.g., 20 (total pieces)
  dropOffDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface DailyReport {
  id: string
  date: string // YYYY-MM-DD
  totalRegistrations: number
  totalItems: number
  totalAmount: number
  registrationIds: string[]
  createdAt: Date
  updatedAt: Date
}

export interface IContact {
  id?: string
  name: string
  phoneNumber: string
  subject: string
  message: string
  createdAt?: Date
}

export interface IContactResponse {
  message: string
  status: number
}

export interface IGetContactsResponse {
  data: IGetContactsContent[]
}

export interface IGetContactsContent {
  _id: string
  name: string
  isRead: string
  phoneNumber: string
  subject: string
  message: string
}

// export interface ILaundryItem {
//   category: string
//   description: string
//   quantity: number
//   price: number
//   total: number
// }

export interface ILaundryItem extends Document{
  orderId: string
  categoryId: string
  itemId: string
  itemName: string
  quantity: number
  price: number
  totalPrice: number
  createdAt: Date
  updatedAt: Date
}
  
export interface IOrder extends Document {
  customerId: string
  laundryItems: string[]
  totalAmount: number
  receiptId: string
  createdAt: Date
}

export interface ICustomer extends Document {
  name: string
  phoneNumber: string
  address: string
  orders?: mongoose.Schema.Types.ObjectId[]
}
