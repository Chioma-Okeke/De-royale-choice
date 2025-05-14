import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../../models/db";
import { verifyAuth } from "../../utils/auth";
import Order from "@/models/order-model";
import connectDb from "@/lib/db-connect";

// Get registration by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        await connectDb();

        const { id } = await params;

        // Populate customer and laundry items
        const order = await Order.findById(id)
            .populate("customerId")
            .populate("laundryItems");

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// make to look into this when fetrching individual orcers
// const order = await Order.findById(orderId).populate({
//     path: "laundryItems",
//     populate: {
//       path: "item categoryId", // populates nested refs
//     }
//   });

// Update registration status
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        const { id } = params;
        const registration = db.registrations.get(id);

        if (!registration) {
            return NextResponse.json(
                { error: "Registration not found" },
                { status: 404 }
            );
        }

        const body = await request.json();
        const { status, notes } = body;

        // Validate status
        if (
            status &&
            ![
                "registered",
                "processing",
                "completed",
                "delivered",
                "cancelled",
            ].includes(status)
        ) {
            return NextResponse.json(
                { error: "Invalid status value" },
                { status: 400 }
            );
        }

        // Update registration
        const updatedRegistration = {
            ...registration,
            status: status || registration.status,
            notes: notes !== undefined ? notes : registration.notes,
            updatedAt: new Date(),
            // If status is 'delivered', set pickup date
            ...(status === "delivered" ? { pickupDate: new Date() } : {}),
        };

        db.registrations.set(id, updatedRegistration);

        return NextResponse.json({
            message: "Registration updated successfully",
            registration: updatedRegistration,
        });
    } catch (error) {
        console.error("Error updating registration:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Delete registration (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success || !authResult.user || authResult.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can delete registrations" },
                { status: 403 }
            );
        }

        const { id } = params;
        const registration = db.registrations.get(id);

        if (!registration) {
            return NextResponse.json(
                { error: "Registration not found" },
                { status: 404 }
            );
        }

        // Check if registration can be deleted (only if it's not processed yet)
        if (
            registration.status !== "registered" &&
            registration.status !== "cancelled"
        ) {
            return NextResponse.json(
                {
                    error: "Cannot delete registration that is already being processed or completed",
                },
                { status: 400 }
            );
        }

        // Delete associated tags
        for (const [tagId, tag] of db.tags.entries()) {
            if (tag.registrationId === id) {
                db.tags.delete(tagId);
            }
        }

        // Delete associated laundry items
        for (const [itemId, item] of db.laundryItems.entries()) {
            if (item.registrationId === id) {
                db.laundryItems.delete(itemId);
            }
        }

        // Remove registration from customer's registrations
        const customer = db.customers.get(registration.customerId);
        if (customer) {
            customer.registrations = customer.registrations.filter(
                (regId) => regId !== id
            );
            db.customers.set(customer.id, {
                ...customer,
                updatedAt: new Date(),
            });
        }

        // Delete registration
        db.registrations.delete(id);

        return NextResponse.json({
            message: "Registration deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting registration:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
