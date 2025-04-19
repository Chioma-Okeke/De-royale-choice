import { type NextRequest, NextResponse } from "next/server"
import { db } from "../../models/db"
import { verifyAuth } from "../../utils/auth"

// Get daily reports
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    // Get query parameters
    const url = new URL(request.url)
    const dateFrom = url.searchParams.get("dateFrom")
    const dateTo = url.searchParams.get("dateTo")

    let reports = Array.from(db.dailyReports.values())

    // Filter by date range
    if (dateFrom) {
      reports = reports.filter((report) => report.date >= dateFrom)
    }

    if (dateTo) {
      reports = reports.filter((report) => report.date <= dateTo)
    }

    // Sort by date (newest first)
    reports.sort((a, b) => b.date.localeCompare(a.date))

    return NextResponse.json({ reports })
  } catch (error) {
    console.error("Error fetching daily reports:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
