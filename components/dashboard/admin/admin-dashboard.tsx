"use client";

import { Tabs } from "@/components/ui/tabs";
import { Header } from "@/components/dashboard/header/header";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { RecentReports } from "../reports/recent-reports";
import { InventorySummaryCard } from "../stats-summaries/inventory-summary-card";
import { useAuth } from "@/hooks/use-auth";
import { DailyStatsCard } from "../stats-summaries/daily-stats-card";
import { BusinessStatsCard } from "../stats-summaries/business-stats-card";
import { useParams } from "next/navigation";

export default function AdminDashboard() {
    const params = useParams()
    const role = params?.role as 'admin' | "staff"

    return (
        <div className="flex min-h-screen bg-gray-50 scroll-bar">
            <MainDashboardContainer className="scroll-bar">
                <Header title="Admin Dashboard" />
                <main className="p-4 md:p-6 space-y-6 overflow-y-auto">
                    <BusinessStatsCard />
                    <Tabs
                        defaultValue="overview"
                        className="space-y-4"
                    >
                        <RecentReports role={role} />
                        {/* <div className="grid gap-4 md:grid-cols-2">
                            <InventorySummaryCard role={role as "admin" | "staff"} />
                            <DailyStatsCard role={role as "admin" | "staff"} />
                        </div> */}
                    </Tabs>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
