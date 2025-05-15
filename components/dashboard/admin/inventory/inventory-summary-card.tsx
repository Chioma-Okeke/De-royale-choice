
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getCategoriesQueryOpts } from "@/lib/query-options";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";

export function InventorySummaryCard() {
    const { data: categories, isLoading } = useQuery(getCategoriesQueryOpts)

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                    <CardDescription className="h-4 w-60 bg-gray-100 rounded mt-2 animate-pulse" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                    <div className="w-full mt-4 h-10 bg-gray-200 rounded flex items-center justify-center animate-pulse">
                        <ShoppingBag className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="h-4 w-24 bg-gray-300 rounded" />
                    </div>
                </CardContent>
            </Card>

        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>
                    Current inventory categories and
                    items
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {categories && categories.length > 0 && categories.map((category) => {
                        return (
                            <div key={category._id} className="flex justify-between items-center">
                                <span className="text-sm font-medium">
                                    {category.name}
                                </span>
                                <span className="text-sm">
                                    {category.items} items
                                </span>
                            </div>
                        )
                    })}
                </div>
                <Button
                    variant="outline"
                    className="w-full mt-4"
                >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Manage Inventory
                </Button>
            </CardContent>
        </Card>
    )
}