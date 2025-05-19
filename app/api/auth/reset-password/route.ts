// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/db-connect";
import User from "@/models/user-model";
import { cookies } from "next/headers";
import { verifyAuth } from "../../utils/auth";

export async function PATCH(req: NextRequest) {
    try {
        const authResult = await verifyAuth(req);
        if (
            !authResult.success ||
            !authResult.user ||
            authResult.user.role !== "admin"
        ) {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can reset users' passwords" },
                { status: 403 }
            );
        }

        const { targetUserId, newPassword } = await req.json();

        if (!targetUserId || !newPassword) {
            return NextResponse.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }

        await connectDb();

        const user = await User.findById(targetUserId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        const isSelfReset = authResult.user._id === targetUserId;

        return NextResponse.json({
            message: "Password reset successful.",
            logout: isSelfReset,
        });
    } catch (error) {
        console.error("[RESET_PASSWORD_ERROR]", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
