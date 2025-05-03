// Define TypeScript types for our models

import { Document } from "mongoose"

export type Role = "admin" | "staff" | "limited"

export interface User {
  id: string
  username: string
  password: string
  role: Role
  name: string
  email?: string
  createdAt: Date
  updatedAt: Date
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

export interface Category {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Item {
  id: string
  name: string
  categoryId: string
  price: number
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

export interface ILaundryItem {
  category: string
  description: string
  quantity: number
  price: number
  total: number
}

export interface IOrder extends Document {
  customerName: string
  phoneNumber: string
  address?: string
  laundryItems: ILaundryItem[]
  totalAmount: number
  receiptId: string
  createdAt: Date
}
