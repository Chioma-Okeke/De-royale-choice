"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { RecentReports } from "../reports/recent-reports";
import { HeaderCard } from "./header-card";
import { ClipboardList } from "lucide-react";

export default function StaffDashboard() {

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar role="staff" />
            <MainDashboardContainer>
                <Header title="Staff Dashboard" role="staff" username="staff" />
                <main className="p-4 md:p-6 space-y-6">
                    <HeaderCard/>

                    <RecentReports/>

                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Summary</CardTitle>
                            <CardDescription>
                                Today's activity summary
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm font-medium text-muted-foreground">
                                        New Registrations
                                    </div>
                                    <div className="text-3xl font-bold mt-2">
                                        12
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Items Processed
                                    </div>
                                    <div className="text-3xl font-bold mt-2">
                                        47
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Receipts Printed
                                    </div>
                                    <div className="text-3xl font-bold mt-2">
                                        15
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/reports">
                                    <ClipboardList className="h-4 w-4 mr-2" />
                                    Daily Reports
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
