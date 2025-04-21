import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../../models/db";
import { verifyAuth } from "../../utils/auth";

// Get tag by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        const { id } = params;
        const tag = db.tags.get(id);

        if (!tag) {
            return NextResponse.json(
                { error: "Tag not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ tag });
    } catch (error) {
        console.error("Error fetching tag:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
