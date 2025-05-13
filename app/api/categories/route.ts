import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../models/db";
import { verifyAuth } from "../utils/auth";
import connectDb from "@/lib/db-connect";
import Category from "@/models/categories.model";
import Item from "@/models/item-model";

// Get all categories
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

        await connectDb()

        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return NextResponse.json(
                { error: "No categories found" },
                { status: 404 }
            );
        }

        // For each category, count the number of items associated with it
        const categoriesWithCounts = await Promise.all(
            categories.map(async (category) => {
                const itemCount = await Item.countDocuments({
                    categoryId: category._id,
                });
                return {
                    ...category.toObject(),
                    items: itemCount,
                };
            })
        );

        // Sort by name
        categoriesWithCounts.sort((a, b) => a.name.localeCompare(b.name));

        return NextResponse.json({ categories: categoriesWithCounts });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Create a new category (admin only)
export async function POST(request: NextRequest) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (
            !authResult.success ||
            !authResult.user ||
            authResult.user.role !== "admin"
        ) {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can create categories" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const name = body.name?.trim();

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { error: "Category name is required" },
                { status: 400 }
            );
        }

        await connectDb();
        // Check if category with same name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return NextResponse.json(
                { error: "Category with this name already exists" },
                { status: 409 }
            );
        }

        // Create new category
        const newCategory = new Category({ name });
        await newCategory.save();

        return NextResponse.json(
            {
                message: "Category created successfully",
                category: newCategory,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
