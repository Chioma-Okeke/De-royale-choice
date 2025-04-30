import { emailRegex } from "@/lib/constants";
import connectDb from "@/lib/db-connect";
import Contact from "@/models/contact-nodel";
import { NextRequest, NextResponse } from "next/server";

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
    }
}
