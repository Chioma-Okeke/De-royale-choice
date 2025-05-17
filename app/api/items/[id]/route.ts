import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../../models/db";
import { verifyAuth } from "../../utils/auth";
import Item from "@/models/item-model";
import Category from "@/models/categories.model";
import connectDb from "@/lib/db-connect";

// Get item by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        const { id } = params;
        const item = db.items.get(id);

        if (!item) {
            return NextResponse.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ item });
    } catch (error) {
        console.error("Error fetching item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Update item (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (
            !authResult.success ||
            !authResult.user ||
            authResult.user.role !== "admin"
        ) {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can update items" },
                { status: 403 }
            );
        }

        const { id } = params;

        await connectDb();

        const item = await Item.findById(id);

        if (!item) {
            return NextResponse.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        const body = await request.json();
        const { itemName, categoryId, itemPrice, piecePerItem } = body;

        // Validate required fields
        if (!itemName || !categoryId || itemPrice === undefined || piecePerItem === undefined) {
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
                { error: "Item price must be a positive number" },
                { status: 400 }
            );
        }

        // Check if category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        // Check if name is already used by another item in the same category
        const existingItem = await Item.findOne({
            _id: { $ne: id },
            categoryId,
            itemName,
        }).collation({ locale: "en", strength: 2 });

        if (existingItem) {
            return NextResponse.json(
                {
                    error: "Item with this name already exists in the category",
                },
                { status: 409 }
            );
        }

        // Update item
        item.itemName = itemName;
        item.itemPrice = itemPrice;
        item.categoryId = categoryId;
        item.piecePerItem  = piecePerItem;
        item.updatedAt = new Date();

        await item.save();

        return NextResponse.json({
            message: "Item updated successfully",
            item,
        });
    } catch (error) {
        console.error("Error updating item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Delete item (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (
            !authResult.success ||
            !authResult.user ||
            authResult.user.role !== "admin"
        ) {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can delete items" },
                { status: 403 }
            );
        }

        const { id } = params;

        await connectDb()
        
        const item = await Item.findById(id);

        if (!item) {
            return NextResponse.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        await Item.findByIdAndDelete(id)

        return NextResponse.json({
            message: "Item deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
