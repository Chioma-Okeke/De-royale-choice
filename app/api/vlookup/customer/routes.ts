import Customer from "@/models/customer-model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)
        const phoneNumber = url.searchParams.get("phoneNumber") || ""
        const name = url.searchParams.get("customerName") || ""

        if (!phoneNumber && !name) {
            return NextResponse.json(
                {message: "Phone number or Name required."},
                {status: 400}
            )
        }
        
        const query: any = {};
        if (phoneNumber) query.phoneNumber = phoneNumber;
        if (name) query.name = name;

        const customer = await Customer.findOne({ query })

        if (!customer) {
            return NextResponse.json({ message: "Customer does not exist." }, { status: 404 })
        }

        return NextResponse.json({ customer }, {
            status: 200
        })
    } catch (error) {
        console.error(error)
        NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 })
    }
}