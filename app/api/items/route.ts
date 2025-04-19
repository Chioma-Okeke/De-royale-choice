import { type NextRequest, NextResponse } from "next/server"
import { db } from "../models/db"
import type { Item } from "../models/types"
import { verifyAuth } from "../utils/auth"

// Get all items
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    // Get query parameters
    const url = new URL(request.url)
    const categoryId = url.searchParams.get("categoryId")

    let items = Array.from(db.items.values())

    // Filter by category if provided
    if (categoryId) {
      items = items.filter((item) => item.categoryId === categoryId)
    }

    // Sort by name
    items.sort((a, b) => a.name.localeCompare(b.name))

    return NextResponse.json({ items })
  } catch (error) {
    console.error("Error fetching items:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create a new item (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success || authResult.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Only admins can create items" }, { status: 403 })
    }

    const body = await request.json()
    const { name, categoryId, price } = body

    // Validate required fields
    if (!name || !categoryId || price === undefined) {
      return NextResponse.json({ error: "Name, category ID, and price are required" }, { status: 400 })
    }

    // Validate price
    if (typeof price !== "number" || price <= 0) {
      return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 })
    }

    // Check if category exists
    const category = db.categories.get(categoryId)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Check if item with same name already exists in the category
    for (const item of db.items.values()) {
      if (item.categoryId === categoryId && item.name.toLowerCase() === name.toLowerCase()) {
        return NextResponse.json({ error: "Item with this name already exists in the category" }, { status: 409 })
      }
    }

    // Create new item
    const id = db.generateId()
    const newItem: Item = {
      id,
      name,
      categoryId,
      price,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    db.items.set(id, newItem)

    return NextResponse.json(
      {
        message: "Item created successfully",
        item: newItem,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
