import connectDb from "@/lib/db-connect";
import Contact from "@/models/contact-model";
import { NextResponse } from "next/server";

// this endpoint is to be used for fetching unread inquiries
export async function GET() {
    await connectDb();
    const unReadInquiries = await Contact.find({isRead: false}).sort({createdAt: -1})
    return NextResponse.json(unReadInquiries)
}