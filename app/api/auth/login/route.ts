import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/db-connect";
import User from "@/models/user-model";

const isKeyAvailable = () => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Please define the JWT_SECRET environment variable")
    }
    return process.env.JWT_SECRET
}

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { email, password } = await req.json();
        const user = await User.findOne({ email });

        console.log(password, user?.password)

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign({ id: user._id, role: user.role }, isKeyAvailable(), {
            expiresIn: "12h",
        });

        const response = NextResponse.json({
            message: "Logged in",
            user: { email: user.email, role: user.role },
        });
        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 12,
        });

        return response;
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 401 }
        );
    }
}
