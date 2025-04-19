import { type NextRequest, NextResponse } from "next/server"
import { db } from "../models/db"
import type { LaundryItem, Registration, Tag } from "../models/types"
import { verifyAuth } from "../utils/auth"

// Get all registrations
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    // Get query parameters
    const url = new URL(request.url)
    const search = url.searchParams.get("search") || ""
    const status = url.searchParams.get("status") || ""
    const dateFrom = url.searchParams.get("dateFrom") || ""
    const dateTo = url.searchParams.get("dateTo") || ""
    const limit = Number.parseInt(url.searchParams.get("limit") || "50")
    const offset = Number.parseInt(url.searchParams.get("offset") || "0")

    // Filter registrations
    let registrations: Registration[] = Array.from(db.registrations.values())

    if (search) {
      const searchLower = search.toLowerCase()
      registrations = registrations.filter(
        (reg) =>
          reg.registrationNumber.toLowerCase().includes(searchLower) ||
          reg.customerName.toLowerCase().includes(searchLower) ||
          reg.customerPhone.includes(search),
      )
    }

    if (status) {
      registrations = registrations.filter((reg) => reg.status === status)
    }

    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      registrations = registrations.filter((reg) => new Date(reg.dropOffDate) >= fromDate)
    }

    if (dateTo) {
      const toDate = new Date(dateTo)
      registrations = registrations.filter((reg) => new Date(reg.dropOffDate) <= toDate)
    }

    // Sort by date (newest first)
    registrations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Apply pagination
    const paginatedRegistrations = registrations.slice(offset, offset + limit)

    return NextResponse.json({
      registrations: paginatedRegistrations,
      total: registrations.length,
    })
  } catch (error) {
    console.error("Error fetching registrations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create a new registration
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    const body = await request.json()
    const { customerId, items, notes } = body

    // Validate required fields
    if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Customer ID and at least one item are required" }, { status: 400 })
    }

    // Check if customer exists
    const customer = db.customers.get(customerId)
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Generate registration number
    const registrationNumber = db.generateRegistrationNumber()

    // Calculate totals
    let totalItems = 0
    let totalAmount = 0

    const laundryItems: LaundryItem[] = []

    // Process each item
    for (const item of items) {
      const { itemId, quantity, price } = item

      // Validate item
      if (!itemId || !quantity || quantity <= 0 || !price || price <= 0) {
        return NextResponse.json({ error: "Invalid item data" }, { status: 400 })
      }

      // Check if item exists in inventory
      const inventoryItem = db.items.get(itemId)
      if (!inventoryItem) {
        return NextResponse.json({ error: `Item with ID ${itemId} not found` }, { status: 404 })
      }

      // Create laundry item
      const laundryItemId = db.generateId()
      const laundryItem: LaundryItem = {
        id: laundryItemId,
        registrationId: "", // Will be set after registration is created
        itemId,
        description: inventoryItem.name,
        quantity,
        price,
        totalPrice: price * quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      laundryItems.push(laundryItem)

      totalItems += quantity
      totalAmount += laundryItem.totalPrice
    }

    // Create registration
    const id = db.generateId()
    const newRegistration: Registration = {
      id,
      registrationNumber,
      customerId,
      customerName: customer.name,
      customerPhone: customer.phone,
      items: [],
      totalItems,
      totalAmount,
      status: "registered",
      dropOffDate: new Date(),
      handledBy: authResult.user.id,
      notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Update laundry items with registration ID and save them
    for (const item of laundryItems) {
      item.registrationId = id
      db.laundryItems.set(item.id, item)
      newRegistration.items.push(item)
    }

    // Save registration
    db.registrations.set(id, newRegistration)

    // Update customer's registrations
    customer.registrations.push(id)
    db.customers.set(customerId, {
      ...customer,
      updatedAt: new Date(),
    })

    // Generate tags
    const tags: Tag[] = []
    for (let i = 1; i <= totalItems; i++) {
      const tagId = db.generateId()
      const tag: Tag = {
        id: tagId,
        registrationId: id,
        registrationNumber,
        customerName: customer.name,
        tagNumber: i,
        totalTags: totalItems,
        dropOffDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      db.tags.set(tagId, tag)
      tags.push(tag)
    }

    // Update daily report
    const today = new Date().toISOString().split("T")[0]
    let dailyReport = Array.from(db.dailyReports.values()).find((report) => report.date === today)

    if (dailyReport) {
      dailyReport.totalRegistrations += 1
      dailyReport.totalItems += totalItems
      dailyReport.totalAmount += totalAmount
      dailyReport.registrationIds.push(id)
      dailyReport.updatedAt = new Date()
      db.dailyReports.set(dailyReport.id, dailyReport)
    } else {
      const reportId = db.generateId()
      dailyReport = {
        id: reportId,
        date: today,
        totalRegistrations: 1,
        totalItems: totalItems,
        totalAmount: totalAmount,
        registrationIds: [id],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      db.dailyReports.set(reportId, dailyReport)
    }

    return NextResponse.json(
      {
        message: "Registration created successfully",
        registration: newRegistration,
        tags,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating registration:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
