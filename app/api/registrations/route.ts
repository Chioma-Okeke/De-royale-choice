import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../models/db";
import type { Registration, Tag } from "../../../models/types";
import { verifyAuth } from "../utils/auth";
import Order from "@/models/order-model";
import connectDb from "@/lib/db-connect";
import LaundryItem from "@/models/laundry-item-model";
import Counter from "@/models/counter-model";
import Customer from "@/models/customer-model";

async function getNextOrderSequence() {
    const result = await Counter.findOneAndUpdate(
        { name: "order" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // create if it doesn't exist
    );

    return result.seq;
}

export async function GET(request: NextRequest) {
    try {
        await connectDb();

        const authResult = await verifyAuth(request);
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        // 2. Get query parameters
        const url = new URL(request.url);
        const search = url.searchParams.get("search") || "";
        const statusFilter = url.searchParams.get("status") || "";
        const dateFrom = url.searchParams.get("dateFrom");
        const dateTo = url.searchParams.get("dateTo");
        const limit = parseInt(url.searchParams.get("limit") || "50");
        const offset = parseInt(url.searchParams.get("offset") || "0");

        const query: any = {};

        if (dateFrom || dateTo) {
            query.createdAt = {};
            if (dateFrom) {
                const start = new Date(dateFrom);
                start.setUTCHours(0, 0, 0, 0);
                query.createdAt.$gte = start;
            }

            if (dateTo) {
                const end = new Date(dateTo);
                end.setUTCHours(23, 59, 59, 999);
                query.createdAt.$lte = end;
            }
        }

        if (statusFilter) {
            query.status = statusFilter;
        }

        const orders = await Order.find(query)
            .populate("customerId")
            .populate("laundryItems")
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);

        const filteredOrders = orders.filter((order) => {
            const customer = order.customerId as any;
            const matchesSearch =
                order.receiptId.includes(search) ||
                customer.name?.toLowerCase().includes(search.toLowerCase()) ||
                customer.phoneNumber?.includes(search);

            return search ? matchesSearch : true;
        });

        const formatted = filteredOrders.map((order) => {
            const customer = order.customerId as any;
            return {
                orderId: order._id,
                receiptId: order.receiptId,
                customer: customer.name,
                phone: customer.phoneNumber,
                date: order.createdAt.toISOString().split("T")[0], // YYYY-MM-DD
                items: order.laundryItems.length,
                status: "pending", // or order.status if you implement it
                amount: order.totalAmount,
            };
        });

        const totalCount = await Order.countDocuments(query);

        return NextResponse.json({
            registrations: formatted,
            total: totalCount,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}


// Create a new registration
export async function POST(req: Request) {
    try {
        await connectDb();

        const body = await req.json();
        const { customerId, items, totalAmount } = body;

        if (!customerId || !items?.length || !totalAmount) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const sequenceNumber = await getNextOrderSequence();
        const receiptId = `115${sequenceNumber}`;

        const newOrder = await Order.create({
            customerId,
            laundryItems: [],
            totalAmount,
            receiptId,
        });

        const laundryItemDocs = await Promise.all(
            items.map(async (item: any) => {
                const laundryItem = await LaundryItem.create({
                    orderId: newOrder._id,
                    categoryId: item.categoryId,
                    itemId: item.itemId,
                    itemName: item.itemName,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.totalPrice,
                });

                return laundryItem._id;
            })
        );

        newOrder.laundryItems = laundryItemDocs;
        await newOrder.save();

        return NextResponse.json(
            { success: true, message: "Order created", order: newOrder },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Order creation failed:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
