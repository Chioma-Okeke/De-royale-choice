import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../../models/db";
import { verifyAuth } from "../../utils/auth";
import Order from "@/models/order-model";
import connectDb from "@/lib/db-connect";
import LaundryItem from "@/models/laundry-item-model";
import Customer from "@/models/customer-model";

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
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
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
        if (
            !authResult.success ||
            !authResult.user ||
            authResult.user.role !== "admin"
        ) {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can update orders" },
                { status: 403 }
            );
        }

        await connectDb();

        const { id } = params;
        const order = await Order.findById(id);

        if (!order) {
            return NextResponse.json(
                { error: "Registration not found" },
                { status: 404 }
            );
        }

        const body = await request.json();
        const { deposit } = body;

        const updatedDeposit = order.deposit + deposit

        const status = order.totalAmount === updatedDeposit ? "Completed" : "Pending";
        const balance = order.totalAmount - deposit;

        order.deposit = updatedDeposit;
        order.status = status

        await order.save();

        return NextResponse.json({
            message: "Registration updated successfully",
            order: {
                ...order.toObject(),
                status,
                balance,
            },
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
        if (
            !authResult.success ||
            !authResult.user ||
            authResult.user.role !== "admin"
        ) {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can delete registrations" },
                { status: 403 }
            );
        }

        const { id } = await params;

        await connectDb()
        const registration = await Order.findById(id);

        if (!registration) {
            return NextResponse.json(
                { error: "Registration not found" },
                { status: 404 }
            );
        }

        for (const laundryItem of registration.laundryItems) {
            await LaundryItem.findByIdAndDelete(laundryItem)
        }

        const customer = await Customer.findById(registration.customerId)
        if (customer) {
            customer.orders = customer.orders?.filter((order) => {
                return order.toString() !== registration._id?.toString()
            })
            await customer.save()
        }

        await registration.deleteOne()

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
