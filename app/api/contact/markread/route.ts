import connectDb from "@/lib/db-connect";
import Contact from "@/models/contact-model";
import { NextResponse } from "next/server";

export async function POST() {
    await connectDb()
    await Contact.updateMany({isRead: false}, {isRead: true})
    return NextResponse.json({message: "All marked as read"})
}