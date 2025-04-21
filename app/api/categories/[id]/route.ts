import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../../models/db";
import { verifyAuth } from "../../utils/auth";

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
        const category = db.categories.get(id);

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
        if (!authResult.success || authResult.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can update categories" },
                { status: 403 }
            );
        }

        const { id } = params;
        const category = db.categories.get(id);

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        const body = await request.json();
        const { name } = body;

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { error: "Category name is required" },
                { status: 400 }
            );
        }

        // Check if name is already used by another category
        if (name.toLowerCase() !== category.name.toLowerCase()) {
            for (const c of db.categories.values()) {
                if (
                    c.id !== id &&
                    c.name.toLowerCase() === name.toLowerCase()
                ) {
                    return NextResponse.json(
                        { error: "Category with this name already exists" },
                        { status: 409 }
                    );
                }
            }
        }

        // Update category
        const updatedCategory = {
            ...category,
            name,
            updatedAt: new Date(),
        };

        db.categories.set(id, updatedCategory);

        return NextResponse.json({
            message: "Category updated successfully",
            category: updatedCategory,
        });
    } catch (error) {
        console.error("Error updating category:", error);
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
        if (!authResult.success || authResult.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized. Only admins can delete categories" },
                { status: 403 }
            );
        }

        const { id } = params;
        const category = db.categories.get(id);

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        // Check if category has items
        for (const item of db.items.values()) {
            if (item.categoryId === id) {
                return NextResponse.json(
                    { error: "Cannot delete category with existing items" },
                    { status: 400 }
                );
            }
        }

        // Delete category
        db.categories.delete(id);

        return NextResponse.json({
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
