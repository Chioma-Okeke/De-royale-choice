"use client";

import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { RecentReports } from "../reports/recent-reports";
import { HeaderCard } from "./header-card";
import { Header } from "../header/header";
import { useParams } from "next/navigation";

export default function StaffDashboard() {
    const params = useParams()
    const role = params?.role as 'admin' | "staff"
    return (
        <div className="flex min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Staff Dashboard" />
                <main className="p-4 md:p-6 space-y-6">
                    <HeaderCard role={role}/>
                    <RecentReports role={role}/>
                    {/* <Card>
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
                    </Card> */}
                </main>
            </MainDashboardContainer>
        </div>
    );
}
