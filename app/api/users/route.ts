import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "../utils/auth";
import connectDb from "@/lib/db-connect";
import User from "@/models/user-model";

export async function GET(req: NextRequest) {
    const authResult = await verifyAuth(req);
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

    try {
        await connectDb();

        const users = await User.find().select("-password -__v");

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
