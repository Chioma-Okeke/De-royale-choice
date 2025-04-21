// This file would connect to your database
// For this example, we'll use a simple in-memory store
// In a real application, you would connect to MongoDB, PostgreSQL, etc.

import type { User, Customer, Category, Item, Registration, Tag, DailyReport, LaundryItem } from "./types"

// In-memory database
class Database {
  users: Map<string, User>
  customers: Map<string, Customer>
  categories: Map<string, Category>
  items: Map<string, Item>
  registrations: Map<string, Registration>
  laundryItems: Map<string, LaundryItem>
  tags: Map<string, Tag>
  dailyReports: Map<string, DailyReport>

  constructor() {
    this.users = new Map()
    this.customers = new Map()
    this.categories = new Map()
    this.items = new Map()
    this.registrations = new Map()
    this.laundryItems = new Map()
    this.tags = new Map()
    this.dailyReports = new Map()

    // Initialize with some data
    this.seedData()
  }

  private seedData() {
    // Add admin user
    const adminId = this.generateId()
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // 'password' hashed
      role: "admin",
      name: "Admin User",
      email: "admin@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Add staff user
    const staffId = this.generateId()
    this.users.set(staffId, {
      id: staffId,
      username: "staff",
      password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // 'password' hashed
      role: "staff",
      name: "Staff User",
      email: "staff@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Add categories
    const categories = [
      { id: "cat1", name: "Clothes" },
      { id: "cat2", name: "Bedding" },
      { id: "cat3", name: "Curtains" },
      { id: "cat4", name: "Others" },
    ]

    categories.forEach((cat) => {
      this.categories.set(cat.id, {
        ...cat,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    })

    // Add items
    const items = [
      { id: "item1", name: "Shirt", categoryId: "cat1", price: 500 },
      { id: "item2", name: "Trousers", categoryId: "cat1", price: 700 },
      { id: "item3", name: "Dress", categoryId: "cat1", price: 800 },
      { id: "item4", name: "Jacket", categoryId: "cat1", price: 1000 },
      { id: "item5", name: "Bedsheet", categoryId: "cat2", price: 1200 },
      { id: "item6", name: "Duvet Cover", categoryId: "cat2", price: 1500 },
      { id: "item7", name: "Pillowcase", categoryId: "cat2", price: 300 },
      { id: "item8", name: "Window Curtain", categoryId: "cat3", price: 1800 },
      { id: "item9", name: "Door Curtain", categoryId: "cat3", price: 2000 },
      { id: "item10", name: "Towel", categoryId: "cat4", price: 400 },
      { id: "item11", name: "Tablecloth", categoryId: "cat4", price: 900 },
      { id: "item12", name: "Napkin", categoryId: "cat4", price: 200 },
    ]

    items.forEach((item) => {
      this.items.set(item.id, {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    })
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  generateRegistrationNumber(): string {
    return `REG-${Math.floor(1000 + Math.random() * 9000)}`
  }
}

// Export a singleton instance
export const db = new Database()
