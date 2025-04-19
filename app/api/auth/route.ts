import { type NextRequest, NextResponse } from "next/server"
import { db } from "../models/db"
import type { User } from "../models/types"
import { cookies } from "next/headers"
import { sign, verify } from "jsonwebtoken"

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Login endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Find user by username
    let foundUser: User | undefined
    for (const user of db.users.values()) {
      if (user.username === username) {
        foundUser = user
        break
      }
    }

    if (!foundUser) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    // In a real app, you would use bcrypt to compare passwords
    // For this example, we'll just compare directly (not secure!)
    // const passwordMatch = await bcrypt.compare(password, foundUser.password);
    const passwordMatch = password === "password" // Simplified for demo

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    // Create JWT token
    const token = sign(
      {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    )

    // Set cookie
    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    // Return user info (without password)
    const { password: _, ...userWithoutPassword } = foundUser

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Logout endpoint
export async function DELETE() {
  cookies().delete("auth_token")
  return NextResponse.json({ message: "Logged out successfully" })
}

// Get current user endpoint
export async function GET() {
  try {
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = verify(token, JWT_SECRET) as { id: string }
    const user = db.users.get(decoded.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user info (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
  }
}
