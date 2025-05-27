import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../models/db";
import { verifyAuth } from "../utils/auth";
import connectDb from "@/lib/db-connect";
import Item from "@/models/item-model";
import Category from "@/models/categories.model";

// Get all items
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

        const url = new URL(request.url);
        const limit = parseInt(url.searchParams.get("limit") || "15");
        const offset = parseInt(url.searchParams.get("offset") || "0");
        const sortBy = url.searchParams.get("sortBy") || "categoryName";

        await connectDb();

        // Fetch items and categories
        const [items, categories] = await Promise.all([
            Item.find().lean().skip(offset).limit(limit),
            Category.find().lean(),
        ]);

        if (!items || items.length === 0) {
            return NextResponse.json(
                { message: "No items found." },
                { status: 404 }
            );
        }

        const categoryMap = new Map(
            categories.map((cat) => [String(cat._id), cat.name])
        );

        const itemsWithCategoryName = items.map((item) => ({
            ...item,
            categoryName: categoryMap.get(String(item.categoryId)) || "Unknown",
        }));

        // Sort by item name
        itemsWithCategoryName.sort((a, b) => {
            if (sortBy === "categoryName") {
                return a.categoryName.localeCompare(b.categoryName);
            } else if (sortBy === "itemName") {
                return a.itemName.localeCompare(b.itemName);
            } else {
                return 0;
            }
        });

        const totalCount = await Item.countDocuments();

        return NextResponse.json({
            items: itemsWithCategoryName,
            total: totalCount,
        });
    } catch (error) {
        console.error("Error fetching items:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Create a new item (admin only)
export async function POST(request: NextRequest) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success || authResult?.user?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can create items" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { itemName, categoryId, itemPrice, piecePerItem } = body;

        // Validate required fields
        if (
            !itemName ||
            !categoryId ||
            itemPrice === undefined ||
            piecePerItem === undefined
        ) {
            return NextResponse.json(
                {
                    error: "All fields are required",
                },
                { status: 400 }
            );
        }

        // Validate price
        if (typeof itemPrice !== "number" || itemPrice <= 0) {
            return NextResponse.json(
                { error: "Price must be a positive number" },
                { status: 400 }
            );
        }

        // Connect to DB
        await connectDb();

        // Check if category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        // Check if item with same name already exists in the same category
        const existingItem = await Item.findOne({
            categoryId,
            itemName,
        }).collation({ locale: "en", strength: 2 });

        if (existingItem) {
            return NextResponse.json(
                { error: "Item with this name already exists in the category" },
                { status: 409 }
            );
        }

        // Create and save new item
        const newItem = new Item({
            itemName,
            itemPrice,
            categoryId,
            piecePerItem,
        });

        await newItem.save();

        const responseItem = {
            _id: newItem._id,
            itemName: newItem.itemName,
            itemPrice: newItem.itemPrice,
            categoryName: category.name,
            categoryId: category._id,
            piecePerItem: newItem.piecePerItem ?? 1,
        };

        return NextResponse.json(
            {
                message: "Item created successfully",
                item: responseItem,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
