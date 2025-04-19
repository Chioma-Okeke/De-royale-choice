import { type NextRequest, NextResponse } from "next/server"
import { db } from "../../../models/db"
import { verifyAuth } from "../../../utils/auth"

// Get daily report by date
export async function GET(request: NextRequest, { params }: { params: { date: string } }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    const { date } = params

    // Find report for the given date
    const report = Array.from(db.dailyReports.values()).find((r) => r.date === date)

    if (!report) {
      return NextResponse.json({ error: "Report not found for the specified date" }, { status: 404 })
    }

    // Get registrations for this report
    const registrations = report.registrationIds.map((id) => db.registrations.get(id)).filter(Boolean) // Filter out any undefined values

    return NextResponse.json({
      report,
      registrations,
    })
  } catch (error) {
    console.error("Error fetching daily report:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
