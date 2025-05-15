import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "../../utils/auth";
import connectDb from "@/lib/db-connect";
import Customer from "@/models/customer-model";
import Order from "@/models/order-model";
import LaundryItem from "@/models/laundry-item-model";

export async function GET(request: NextRequest) {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
        return NextResponse.json(
            { error: authResult.error },
            { status: authResult.status }
        );
    }

    try {
        await connectDb()

        const customers = await Customer.find()
        const orders = await Order.find().populate("laundryItems")
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
        const totalItemsProcessed = orders.reduce((count, order) => count + (order.laundryItems.length || 0), 0)

        const statistics = {
            customersCount: customers.length,
            ordersCount: orders.length,
            totalRevenue,
            totalItemsProcessed
        }

        return NextResponse.json(
            { stats: statistics },
            { status: 200 }
        )


    } catch (error) {
        console.error("Error fetching business statistics:", error);
        return NextResponse.json(
            { error: `Internal server error ${error}` },
            { status: 500 }
        );
    }
}