
import StatsService from "@/app/services/stats-service";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "@bprogress/next";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";

export function DailyStatsCard({role}:{role: "admin" | "staff"}) {
    const { data: stats, isLoading } = useQuery({
        queryFn: () => new StatsService().getDailyStats(),
        queryKey: ["dailtStats"]
    })
    const router = useRouter()
    
    const navigateToDailyReport = () => {
        router.push(`/dashboard/${role}/reports`)
    }

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
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="h-4 w-24 bg-gray-300 rounded" />
                    </div>
                </CardContent>
            </Card>

        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{stats?.title}</CardTitle>
                <CardDescription>
                    {stats?.subtitle}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {stats && stats.stats.length > 0 && stats.stats.map((stat, index) => {
                        return (
                            <div key={index} className="flex justify-between items-center">
                                <span className="text-sm font-medium">
                                    {stat.label}
                                </span>
                                <span className="text-sm">
                                    {stat.value} {stat.currency ? stat.currency : ""}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={navigateToDailyReport}
                >
                    <Calendar className="mr-2 h-4 w-4" />
                    View Daily Reports
                </Button>
            </CardContent>
        </Card>
    )
}