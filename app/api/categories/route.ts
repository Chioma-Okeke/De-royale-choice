import { type NextRequest, NextResponse } from "next/server"
import { db } from "../models/db"
import type { Category } from "../models/types"
import { verifyAuth } from "../utils/auth"

// Get all categories
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    const categories = Array.from(db.categories.values())

    // Sort by name
    categories.sort((a, b) => a.name.localeCompare(b.name))

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create a new category (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success || authResult.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Only admins can create categories" }, { status: 403 })
    }

    const body = await request.json()
    const { name } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 })
    }

    // Check if category with same name already exists
    for (const category of db.categories.values()) {
      if (category.name.toLowerCase() === name.toLowerCase()) {
        return NextResponse.json({ error: "Category with this name already exists" }, { status: 409 })
      }
    }

    // Create new category
    const id = db.generateId()
    const newCategory: Category = {
      id,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    db.categories.set(id, newCategory)

    return NextResponse.json(
      {
        message: "Category created successfully",
        category: newCategory,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
