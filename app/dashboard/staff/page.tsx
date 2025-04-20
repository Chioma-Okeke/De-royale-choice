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
import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import {
    Printer,
    Search,
    Users,
    ClipboardList,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function StaffDashboard() {
    // Mock data for recent registrations
    const recentRegistrations = [
        {
            id: "REG-001",
            customer: "John Doe",
            phone: "080-1234-5678",
            items: 5,
            date: "Today, 10:30 AM",
            status: "Registered",
        },
        {
            id: "REG-002",
            customer: "Jane Smith",
            phone: "080-8765-4321",
            items: 3,
            date: "Today, 09:15 AM",
            status: "Processing",
        },
        {
            id: "REG-003",
            customer: "Robert Johnson",
            phone: "080-2468-1357",
            items: 7,
            date: "Yesterday, 04:45 PM",
            status: "Completed",
        },
        {
            id: "REG-004",
            customer: "Emily Davis",
            phone: "080-1357-2468",
            items: 2,
            date: "Yesterday, 02:30 PM",
            status: "Registered",
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar role="staff" />
            <div className="flex-1">
                <Header title="Staff Dashboard" role="staff" username="staff" />
                <main className="p-4 md:p-6 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="bg-emerald-50 border-emerald-200">
                            <CardContent className="p-6">
                                <div className="flex flex-col space-y-2">
                                    <Users className="h-12 w-12 text-emerald-600" />
                                    <h3 className="text-2xl font-bold">
                                        Register Customer
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Register a new customer and their
                                        laundry items
                                    </p>
                                    <Button
                                        asChild
                                        className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                                    >
                                        <Link href="/customers/register">
                                            Register New Customer
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col space-y-2">
                                    <Printer className="h-12 w-12 text-emerald-600" />
                                    <h3 className="text-2xl font-bold">
                                        Print Receipts
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Print customer receipts and item tags
                                    </p>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="mt-4"
                                    >
                                        <Link href="/receipts">
                                            Go to Printing
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col space-y-2">
                                    <Search className="h-12 w-12 text-emerald-600" />
                                    <h3 className="text-2xl font-bold">
                                        Search
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Find customer records and transactions
                                    </p>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="mt-4"
                                    >
                                        <Link href="/customers/search">
                                            Search Records
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Registrations</CardTitle>
                            <CardDescription>
                                Latest customer registrations and their status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Reg ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Phone
                                        </TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Date
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentRegistrations.map((registration) => (
                                        <TableRow key={registration.id}>
                                            <TableCell className="font-medium">
                                                {registration.id}
                                            </TableCell>
                                            <TableCell>
                                                {registration.customer}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {registration.phone}
                                            </TableCell>
                                            <TableCell>
                                                {registration.items}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {registration.date}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        registration.status ===
                                                        "Completed"
                                                            ? "bg-green-100 text-green-800"
                                                            : registration.status ===
                                                              "Processing"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                                >
                                                    {registration.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <ArrowRight className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        View details
                                                    </span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/reports">View All Entries</Link>
                            </Button>
                        </CardFooter>
                    </Card>

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
            </div>
        </div>
    );
}
