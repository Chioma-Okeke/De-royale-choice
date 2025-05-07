import Customer from "@/models/customer-model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const term = url.searchParams.get("term") || "";

        if (!term) {
            return NextResponse.json(
                { message: "You need to input a search term." },
                { status: 400 }
            );
        }

        const query: any = {};
        const isPhone = /^\d+$/.test(term);
        if (isPhone) {
            query.phoneNumber = term;
        } else {
            query.name = term;
        }

        const customer = await Customer.findOne(query);

        if (!customer) {
            return NextResponse.json(
                { message: "Customer does not exist." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { customer },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        NextResponse.json(
            { error: `Internal Server Error: ${error}` },
            { status: 500 }
        );
    }
}
