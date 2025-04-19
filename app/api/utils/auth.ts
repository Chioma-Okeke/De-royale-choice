import type { NextRequest } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { db } from "../models/db"
import type { User } from "../models/types"

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

interface AuthResult {
  success: boolean
  user?: User
  error?: string
  status?: number
}

export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        status: 401,
      }
    }

    // Verify token
    const decoded = verify(token, JWT_SECRET) as { id: string }
    const user = db.users.get(decoded.id)

    if (!user) {
      return {
        success: false,
        error: "User not found",
        status: 404,
      }
    }

    return {
      success: true,
      user,
    }
  } catch (error) {
    console.error("Auth verification error:", error)
    return {
      success: false,
      error: "Authentication failed",
      status: 401,
    }
  }
}
