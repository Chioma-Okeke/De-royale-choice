import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../../models/db";
import { verifyAuth } from "../../utils/auth";
import Category from "@/models/categories.model";
import connectDb from "@/lib/db-connect";
import Item from "@/models/item-model";

// Get category by ID
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

        await connectDb()
        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ category });
    } catch (error) {
        console.error("Error fetching category:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Update category (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success || !authResult.user || authResult.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can update categories" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { name } = body;
        const { id } = params;

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { error: "Category name is required" },
                { status: 400 }
            );
        }

        await connectDb()

        const categoryUpdated = await Category.findByIdAndUpdate(id, {name}, {
            new: true,
            runValidators: true,
        });

        if (!categoryUpdated) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        };

        return NextResponse.json({
            message: "Category updated successfully",
            category: categoryUpdated,
        });
    } catch (error: any) {
        console.error("Error updating category:", error);

        if (error.code === 11000) {
            return NextResponse.json(
                { error: "Category name must be unique" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Delete category (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(request);
        if (!authResult.success || !authResult.user || authResult.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can delete categories" },
                { status: 403 }
            );
        }

        const { id } = params;
        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        // delete items in this category
        await Item.deleteMany({ categoryId: id });

        //delete category
        await Category.findByIdAndDelete(id)

        return NextResponse.json({
            message: "Category deleted successfully",
            category: category,
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
