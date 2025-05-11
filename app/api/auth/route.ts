import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../models/db";
import type { User } from "../../../models/types";
import { cookies } from "next/headers";
import { sign, verify } from "jsonwebtoken";

const isKeyAvailable = () => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Please define the JWT_SECRET environment variable")
    }
    return process.env.JWT_SECRET
}

// Login endpoint
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Find user by username
        let foundUser: User | undefined;
        for (const user of db.users.values()) {
            if (user.username === username) {
                foundUser = user;
                break;
            }
        }

        if (!foundUser) {
            return NextResponse.json(
                { error: "Invalid username or password" },
                { status: 401 }
            );
        }

        // In a real app, you would use bcrypt to compare passwords
        // For this example, we'll just compare directly (not secure!)
        // const passwordMatch = await bcrypt.compare(password, foundUser.password);
        const passwordMatch = password === "password"; // Simplified for demo

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid username or password" },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = sign(
            {
                id: foundUser.id,
                username: foundUser.username,
                role: foundUser.role,
            },
            isKeyAvailable(),
            { expiresIn: "24h" }
        );

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        // Return user info (without password)
        const { password: _, ...userWithoutPassword } = foundUser;

        return NextResponse.json({
            message: "Login successful",
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Logout endpoint
export async function DELETE() {
    (await cookies()).delete("auth_token");
    return NextResponse.json({ message: "Logged out successfully" });
}

// Get current user endpoint
export async function GET() {
    try {
        const token = (await cookies()).get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = verify(token, isKeyAvailable()) as { id: string };
        const user = db.users.get(decoded.id);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Return user info (without password)
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 401 }
        );
    }
}


// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "@/models/user-model";
// import connectDb from "@/lib/db-connect";

// export async function POST(request: NextRequest) {
//   const { email, password } = await request.json();
//   await connectDb()

//   const user = await User.findOne({ email });
//   if (!user) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET!,
//     { expiresIn: "7d" }
//   );

//   const res = NextResponse.json({ message: "Login successful", user: { email: user.email, role: user.role } });
//   res.cookies.set("token", token, {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     maxAge: 7 * 24 * 60 * 60,
//   });

//   return res;
// }
