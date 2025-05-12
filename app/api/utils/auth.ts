import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import connectDb from "@/lib/db-connect";
import User from "@/models/user-model";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";


interface AuthUser {
    _id: string;
    email: string;
    role: "admin" | "staff";
  }
interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
  status?: number;
}

export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    await connectDb();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        status: 401,
      };
    }

    const decoded = verify(token, JWT_SECRET) as { id: string };

    const user = await User.findById(decoded.id).select("email role");

    if (!user) {
      return {
        success: false,
        error: "User not found",
        status: 404,
      };
    }

    return {
      success: true,
      user: {
        _id: String(user._id),
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Auth verification error:", error);
    return {
      success: false,
      error: "Invalid or expired token",
      status: 401,
    };
  }
}
