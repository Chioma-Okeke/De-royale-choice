import { type NextRequest, NextResponse } from "next/server"
import { db } from "../../models/db"
import { verifyAuth } from "../../utils/auth"

// Get item by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    const { id } = params
    const item = db.items.get(id)

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json({ item })
  } catch (error) {
    console.error("Error fetching item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Update item (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success || authResult.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Only admins can update items" }, { status: 403 })
    }

    const { id } = params
    const item = db.items.get(id)

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
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

    // Check if name is already used by another item in the same category
    if (categoryId === item.categoryId && name.toLowerCase() !== item.name.toLowerCase()) {
      for (const i of db.items.values()) {
        if (i.id !== id && i.categoryId === categoryId && i.name.toLowerCase() === name.toLowerCase()) {
          return NextResponse.json({ error: "Item with this name already exists in the category" }, { status: 409 })
        }
      }
    }

    // Update item
    const updatedItem = {
      ...item,
      name,
      categoryId,
      price,
      updatedAt: new Date(),
    }

    db.items.set(id, updatedItem)

    return NextResponse.json({
      message: "Item updated successfully",
      item: updatedItem,
    })
  } catch (error) {
    console.error("Error updating item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Delete item (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success || authResult.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Only admins can delete items" }, { status: 403 })
    }

    const { id } = params
    const item = db.items.get(id)

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Check if item is used in any registrations
    for (const laundryItem of db.laundryItems.values()) {
      if (laundryItem.itemId === id) {
        return NextResponse.json({ error: "Cannot delete item that is used in registrations" }, { status: 400 })
      }
    }

    // Delete item
    db.items.delete(id)

    return NextResponse.json({
      message: "Item deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
