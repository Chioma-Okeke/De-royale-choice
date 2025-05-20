import { Header } from "@/components/dashboard/header/header";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { ReportCard } from "@/components/dashboard/reports/report-card";

export default function DailyReports() {
    return (
        <div className="min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Orders" />
                <main className="p-4 md:p-6 space-y-6">
                    <ReportCard/>

                    {/* <Card>
                        <CardHeader>
                            <CardTitle>Daily Summary</CardTitle>
                            <CardDescription>
                                Summary of today's laundry operations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Total Registrations
                                    </div>
                                    <div className="text-3xl font-bold mt-2">
                                        {filteredEntries.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-2">
                                        {status === "all"
                                            ? "All statuses"
                                            : `Status: ${status}`}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Items Processed
                                    </div>
                                    <div className="text-3xl font-bold mt-2">
                                        {totalItems}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-2">
                                        Average:{" "}
                                        {(
                                            totalItems /
                                            Math.max(1, filteredEntries.length)
                                        ).toFixed(1)}{" "}
                                        per entry
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Total Revenue
                                    </div>
                                    <div className="text-3xl font-bold mt-2">
                                        ₦{totalAmount.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-2">
                                        Average: ₦
                                        {(
                                            totalAmount /
                                            Math.max(1, filteredEntries.length)
                                        ).toFixed(0)}{" "}
                                        per entry
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}
                </main>
            </MainDashboardContainer>
        </div>
    );
}
