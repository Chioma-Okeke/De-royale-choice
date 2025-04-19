import { type NextRequest, NextResponse } from "next/server"
import { db } from "../models/db"
import { verifyAuth } from "../utils/auth"

// Get all tags for a registration
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    // Get query parameters
    const url = new URL(request.url)
    const registrationId = url.searchParams.get("registrationId")
    const registrationNumber = url.searchParams.get("registrationNumber")

    if (!registrationId && !registrationNumber) {
      return NextResponse.json({ error: "Either registrationId or registrationNumber is required" }, { status: 400 })
    }

    // Filter tags
    let tags = Array.from(db.tags.values())

    if (registrationId) {
      tags = tags.filter((tag) => tag.registrationId === registrationId)
    }

    if (registrationNumber) {
      tags = tags.filter((tag) => tag.registrationNumber === registrationNumber)
    }

    // Sort by tag number
    tags.sort((a, b) => a.tagNumber - b.tagNumber)

    return NextResponse.json({ tags })
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Regenerate tags for a registration
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    const body = await request.json()
    const { registrationId } = body

    if (!registrationId) {
      return NextResponse.json({ error: "Registration ID is required" }, { status: 400 })
    }

    // Check if registration exists
    const registration = db.registrations.get(registrationId)
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    }

    // Delete existing tags for this registration
    for (const [tagId, tag] of db.tags.entries()) {
      if (tag.registrationId === registrationId) {
        db.tags.delete(tagId)
      }
    }

    // Generate new tags
    const tags = []
    for (let i = 1; i <= registration.totalItems; i++) {
      const tagId = db.generateId()
      const tag = {
        id: tagId,
        registrationId,
        registrationNumber: registration.registrationNumber,
        customerName: registration.customerName,
        tagNumber: i,
        totalTags: registration.totalItems,
        dropOffDate: registration.dropOffDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      db.tags.set(tagId, tag)
      tags.push(tag)
    }

    return NextResponse.json({
      message: "Tags regenerated successfully",
      tags,
    })
  } catch (error) {
    console.error("Error regenerating tags:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
