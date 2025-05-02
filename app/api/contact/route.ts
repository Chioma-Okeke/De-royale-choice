import { emailRegex } from "@/lib/constants";
import connectDb from "@/lib/db-connect";
import Contact from "@/models/contact-nodel";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "../utils/auth";

export async function POST(request: NextRequest) {
    try {
        await connectDb();
        const { name, email, subject, message } = await request.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                {
                    message:
                        "Name, email, subject and message are all required.",
                },
                { status: 400 }
            );
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Invalid email address" },
                { status: 400 }
            );
        }

        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        return NextResponse.json(
            { message: "Message successfully sent." },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Something went wrong", error: String(error) },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }
        // Connecting to db
        await connectDb();

        // fetching of all contacts
        const contacts = await Contact.find()
        
        if (!contacts) {
            return NextResponse.json(
                {message: "No contacts found", data: []},
                {status: 404}
            )
        }
        return NextResponse.json(
            {message: "Contacts fetched successfully", data: contacts},
            {status: 200}
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {message: "Error fetching contacts", error: error},
            {status: 500}
        )
    }
}
