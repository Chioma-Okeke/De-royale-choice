import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "../utils/auth";
import Customer from "@/models/customer-model";
import connectDb from "@/lib/db-connect";

// Get all customers
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

        // Get query parameters
        const url = new URL(request.url);
        const search = url.searchParams.get("search") || "";
        const limit = Number.parseInt(url.searchParams.get("limit") || "50");
        const offset = Number.parseInt(url.searchParams.get("offset") || "0");

        // connecting DB
        await connectDb()

        // Filter customers by search term
        let customers = await Customer.find()

        if (search) {
            const searchLower = search.toLowerCase();
            customers = customers.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(searchLower) ||
                    customer.phoneNumber.includes(search)
            );
        }

        // Apply pagination
        const paginatedCustomers = customers.slice(offset, offset + limit);

        return NextResponse.json({
            customers: paginatedCustomers,
            total: customers.length,
        });
    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Create a new customer
export async function POST(request: NextRequest) {
    try {
        //Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        const body = await request.json();
        const { name, phone, address } = body;

        // Validate required fields
        if (!name || !phone) {
            return NextResponse.json(
                { error: "Name and phone number are required" },
                { status: 400 }
            );
        }

        await connectDb()

        // Check if customer with same phone already exists
        const existingUser = await Customer.findOne({phoneNumber: phone})
        if (existingUser) {
            return NextResponse.json({message: "Customer already exists."}, {status: 400})
        }

        const newCustomer = new Customer({
            name,
            phoneNumber: phone,
            address,
            orders: []
        });

        await newCustomer.save()

        return NextResponse.json(
            {
                message: "Customer created successfully",
                customer: newCustomer,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating customer:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
