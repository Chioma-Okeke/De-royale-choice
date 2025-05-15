import StatsService from "@/app/services/stats-service";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
    DollarSign, ShoppingBag, Users,
    ShirtIcon as Tshirt,
} from "lucide-react";

export function BusinessStatsCard() {

    const { data: statValues, isLoading } = useQuery({
        queryFn: () => new StatsService().getBusinessStats(),
        queryKey: ["businessStats"]
    })

    const stats = [
        {
            title: "Total Customers",
            value: statValues?.customersCount,
            icon: Users,
        },
        {
            title: "Total Orders",
            value: statValues?.ordersCount,
            icon: ShoppingBag,
        },
        {
            title: "Revenue",
            value: `₦${statValues?.totalRevenue}`,
            icon: DollarSign,
        },
        {
            title: "Items Processed",
            value: statValues?.totalItemsProcessed,
            icon: Tshirt,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex flex-col space-y-1">
                                <span className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </span>
                                {isLoading ? (<div className="h-4 w-12 bg-gray-200 rounded-xl animate-pulse" />) : (
                                    <span className="text-2xl font-bold">
                                        {stat.value}
                                    </span>
                                )}
                            </div>
                            <div className="bg-emerald-100 p-2 rounded-full">
                                <stat.icon className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}