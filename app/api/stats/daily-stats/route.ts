import connectDb from "@/lib/db-connect";
import Customer from "@/models/customer-model";
import LaundryItem from "@/models/laundry-item-model";
import Order from "@/models/order-model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const tomorrow = new Date(todayStart);
    tomorrow.setDate(todayStart.getDate() + 1);

    const [newRegistrations, itemsProcessed, completedOrders, revenueData] = await Promise.all([
      Customer.countDocuments({
        createdAt: { $gte: todayStart, $lt: tomorrow },
      }),

      LaundryItem.countDocuments({
        createdAt: { $gte: todayStart, $lt: tomorrow },
      }),

      Order.countDocuments({
        status: "completed",
        completedAt: { $gte: todayStart, $lt: tomorrow },
      }),

      Order.aggregate([
        {
          $match: {
            status: "completed",
            completedAt: { $gte: todayStart, $lt: tomorrow },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$total" },
          },
        },
      ]),
    ]);

    const revenueToday = revenueData[0]?.totalRevenue || 0;

    return NextResponse.json({
      title: "Daily Activity",
      subtitle: "Today's laundry activity summary",
      stats: [
        { label: "New Registrations", value: newRegistrations },
        { label: "Items Processed", value: itemsProcessed },
        { label: "Completed Orders", value: completedOrders },
        { label: "Revenue Today", value: revenueToday, currency: "NGN" },
      ],
    });
  } catch (error) {
    console.error("Daily Activity Error:", error);
    return NextResponse.json({ error: "Failed to load daily activity" }, { status: 500 });
  }
}
