import { type NextRequest, NextResponse } from "next/server"
import { db } from "../../models/db"
import { verifyAuth } from "../../utils/auth"

// Get customer by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    const { id } = params
    const customer = db.customers.get(id)

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json({ customer })
  } catch (error) {
    console.error("Error fetching customer:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Update customer
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    const { id } = params
    const customer = db.customers.get(id)

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const body = await request.json()
    const { name, phone, address } = body

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 })
    }

    // Check if phone number is already used by another customer
    if (phone !== customer.phone) {
      for (const c of db.customers.values()) {
        if (c.id !== id && c.phone === phone) {
          return NextResponse.json({ error: "Phone number is already in use by another customer" }, { status: 409 })
        }
      }
    }

    // Update customer
    const updatedCustomer = {
      ...customer,
      name,
      phone,
      address,
      updatedAt: new Date(),
    }

    db.customers.set(id, updatedCustomer)

    return NextResponse.json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    })
  } catch (error) {
    console.error("Error updating customer:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Delete customer
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success || authResult.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Only admins can delete customers" }, { status: 403 })
    }

    const { id } = params
    const customer = db.customers.get(id)

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Check if customer has registrations
    if (customer.registrations.length > 0) {
      return NextResponse.json({ error: "Cannot delete customer with existing registrations" }, { status: 400 })
    }

    // Delete customer
    db.customers.delete(id)

    return NextResponse.json({
      message: "Customer deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting customer:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
