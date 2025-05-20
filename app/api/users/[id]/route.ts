import connectDb from "@/lib/db-connect";
import User from "@/models/user-model";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        await connectDb();
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "User deleted" });
    } catch (err) {
        return NextResponse.json(
            { message: "Failed to delete user" },
            { status: 500 }
        );
    }
}
