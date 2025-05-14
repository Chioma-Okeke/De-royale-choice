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
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Entries</CardTitle>
                            <CardDescription>
                                View and manage daily laundry entries
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <div className="flex-1">
                                    <Label htmlFor="date">Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="date"
                                            type="date"
                                            className="pl-8"
                                            value={date}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={status}
                                        onValueChange={handleStatusChange}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Statuses
                                            </SelectItem>
                                            <SelectItem value="completed">
                                                Completed
                                            </SelectItem>
                                            <SelectItem value="processing">
                                                Processing
                                            </SelectItem>
                                            <SelectItem value="pending">
                                                Pending
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={handlePrint}
                                    >
                                        <Printer className="mr-2 h-4 w-4" />
                                        Print
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleExport}
                                        disabled={isExporting}
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        {isExporting
                                            ? "Exporting..."
                                            : "Export"}
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Reg ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Phone
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Time
                                            </TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredEntries.map((entry) => (
                                            <TableRow key={entry.id}>
                                                <TableCell className="font-medium">
                                                    {entry.id}
                                                </TableCell>
                                                <TableCell>
                                                    {entry.customer}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {entry.phone}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {entry.time}
                                                </TableCell>
                                                <TableCell>
                                                    {entry.items}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${entry.status ===
                                                                "Completed"
                                                                ? "bg-green-100 text-green-800"
                                                                : entry.status ===
                                                                    "Processing"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                    >
                                                        {entry.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {entry.amount}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                                    <div>
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Total Entries:
                                        </span>
                                        <span className="ml-2 font-medium">
                                            {filteredEntries.length}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Total Items:
                                        </span>
                                        <span className="ml-2 font-medium">
                                            {totalItems}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Total Amount:
                                        </span>
                                        <span className="ml-2 font-medium">
                                            ₦{totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" isActive>
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                2
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                3
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
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
                    </Card>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
