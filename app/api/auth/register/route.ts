import connectDb from "@/lib/db-connect";
import User from "@/models/user-model";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const body = await req.json()
        const { email, password, role } = body;

        const existing = await User.findOne({ email });
        if (existing)
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );

        const newUser = await User.create({ email, password, role });
        return NextResponse.json({
            message: "User created",
            user: { email: newUser.email, role: newUser.role },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
