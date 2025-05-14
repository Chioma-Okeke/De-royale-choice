"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header/header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar, Download, Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { ReportCard } from "@/components/dashboard/reports/report-card";

export default function DailyReports() {
    const { toast } = useToast();
    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [status, setStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [isExporting, setIsExporting] = useState(false);

    // Mock data for daily entries
    const dailyEntries = [
        {
            id: "REG-1234",
            customer: "John Doe",
            phone: "080-1234-5678",
            items: 5,
            time: "10:30 AM",
            status: "Completed",
            amount: "₦5,000",
        },
        {
            id: "REG-2345",
            customer: "Jane Smith",
            phone: "080-8765-4321",
            items: 3,
            time: "09:15 AM",
            status: "Processing",
            amount: "₦3,500",
        },
        {
            id: "REG-3456",
            customer: "Robert Johnson",
            phone: "080-2468-1357",
            items: 7,
            time: "11:45 AM",
            status: "Pending",
            amount: "₦7,200",
        },
        {
            id: "REG-4567",
            customer: "Emily Davis",
            phone: "080-1357-2468",
            items: 2,
            time: "01:30 PM",
            status: "Completed",
            amount: "₦2,800",
        },
        {
            id: "REG-5678",
            customer: "Michael Wilson",
            phone: "080-9876-5432",
            items: 4,
            time: "02:45 PM",
            status: "Completed",
            amount: "₦4,500",
        },
        {
            id: "REG-6789",
            customer: "Sarah Brown",
            phone: "080-5432-1098",
            items: 6,
            time: "03:15 PM",
            status: "Processing",
            amount: "₦6,200",
        },
        {
            id: "REG-7890",
            customer: "David Lee",
            phone: "080-8642-0975",
            items: 3,
            time: "04:00 PM",
            status: "Pending",
            amount: "₦3,800",
        },
        {
            id: "REG-8901",
            customer: "Lisa Taylor",
            phone: "080-9753-1086",
            items: 5,
            time: "04:45 PM",
            status: "Completed",
            amount: "₦5,500",
        },
    ];

    // Filter entries based on status
    const filteredEntries =
        status === "all"
            ? dailyEntries
            : dailyEntries.filter(
                (entry) => entry.status.toLowerCase() === status.toLowerCase()
            );

    
            // Calculate totals
console.log(filteredEntries, "enteries")
    const totalItems = filteredEntries.reduce(
        (sum, entry) => sum + entry.items,
        0
    );
    const totalAmount = filteredEntries.reduce((sum, entry) => {
        const amount = Number.parseFloat(
            entry.amount.replace("₦", "").replace(",", "")
        );
        return sum + amount;
    }, 0);

    const handleDateChange = (e) => {
        setDate(e.target.value);
        // In a real app, this would fetch data for the selected date
        toast({
            title: "Date Changed",
            description: `Showing entries for ${e.target.value}`,
        });
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setCurrentPage(1);
    };

    const handleExport = () => {
        setIsExporting(true);

        // Simulate export process
        setTimeout(() => {
            setIsExporting(false);
            toast({
                title: "Report Exported",
                description: `Daily report for ${date} has been exported successfully.`,
            });
        }, 1500);
    };

    const handlePrint = () => {
        toast({
            title: "Printing Report",
            description: `Daily report for ${date} is being sent to the printer.`,
        });
        // In a real app, this would trigger the printing functionality
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Daily Reports" role="admin" username="admin" />
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
