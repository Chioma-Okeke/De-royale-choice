import { verifyAuth } from "@/app/api/utils/auth";
import connectDb from "@/lib/db-connect";
import Contact from "@/models/contact-model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const authResult = await verifyAuth(request);
    if (!authResult.success || !authResult.user) {
        return NextResponse.json(
            { error: "Authentication is required." },
            { status: 403 }
        );
    }

    const { id } = params;
    
    try {

        await connectDb();

        const contact = await Contact.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!contact) {
            return NextResponse.json(
                { error: "Contact message not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Message read" });
    } catch (error) {
        console.error("[READ_CONTACT_ERROR]", error);
        return NextResponse.json(
            { error: "Something went wrong while updating the message." },
            { status: 500 }
        );
    }
}
