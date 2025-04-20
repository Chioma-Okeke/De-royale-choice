"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import {
    BarChart,
    Calendar,
    DollarSign,
    ShoppingBag,
    ShirtIcon as Tshirt,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    // Mock data for the dashboard
    const stats = [
        {
            title: "Total Customers",
            value: "1,234",
            icon: Users,
            change: "+12%",
            description: "from last month",
        },
        {
            title: "Total Orders",
            value: "5,678",
            icon: ShoppingBag,
            change: "+23%",
            description: "from last month",
        },
        {
            title: "Revenue",
            value: "₦1.2M",
            icon: DollarSign,
            change: "+18%",
            description: "from last month",
        },
        {
            title: "Items Processed",
            value: "12,345",
            icon: Tshirt,
            change: "+15%",
            description: "from last month",
        },
    ];

    const recentTransactions = [
        {
            id: "INV-001",
            customer: "John Doe",
            date: "2023-04-18",
            amount: "₦5,000",
            status: "Completed",
        },
        {
            id: "INV-002",
            customer: "Jane Smith",
            date: "2023-04-18",
            amount: "₦3,500",
            status: "Processing",
        },
        {
            id: "INV-003",
            customer: "Robert Johnson",
            date: "2023-04-17",
            amount: "₦7,200",
            status: "Completed",
        },
        {
            id: "INV-004",
            customer: "Emily Davis",
            date: "2023-04-17",
            amount: "₦2,800",
            status: "Pending",
        },
        {
            id: "INV-005",
            customer: "Michael Wilson",
            date: "2023-04-16",
            amount: "₦4,500",
            status: "Completed",
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
            <Sidebar role="admin" />
            <MainDashboardContainer>
                <Header title="Admin Dashboard" role="admin" username="admin" />
                <main className="p-4 md:p-6 space-y-6 overflow-y-auto">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <Card key={index}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between space-x-4">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm font-medium text-muted-foreground">
                                                {stat.title}
                                            </span>
                                            <span className="text-2xl font-bold">
                                                {stat.value}
                                            </span>
                                        </div>
                                        <div className="bg-emerald-100 p-2 rounded-full">
                                            <stat.icon className="h-5 w-5 text-emerald-600" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                                        <span className="text-emerald-600 font-medium">
                                            {stat.change}
                                        </span>
                                        <span className="ml-1">
                                            {stat.description}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Tabs
                        defaultValue="overview"
                        className="space-y-4"
                        onValueChange={setActiveTab}
                    >
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">
                                Analytics
                            </TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Transactions</CardTitle>
                                    <CardDescription>
                                        Overview of the latest customer
                                        transactions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Invoice</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentTransactions.map(
                                                (transaction) => (
                                                    <TableRow
                                                        key={transaction.id}
                                                    >
                                                        <TableCell className="font-medium">
                                                            {transaction.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                transaction.customer
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {transaction.date}
                                                        </TableCell>
                                                        <TableCell>
                                                            {transaction.amount}
                                                        </TableCell>
                                                        <TableCell>
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                                    transaction.status ===
                                                                    "Completed"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : transaction.status ===
                                                                          "Processing"
                                                                        ? "bg-blue-100 text-blue-800"
                                                                        : "bg-yellow-100 text-yellow-800"
                                                                }`}
                                                            >
                                                                {
                                                                    transaction.status
                                                                }
                                                            </span>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="grid gap-4 md:grid-cols-2">
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
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">
                                                    Clothes
                                                </span>
                                                <span className="text-sm">
                                                    24 items
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">
                                                    Bedding
                                                </span>
                                                <span className="text-sm">
                                                    12 items
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">
                                                    Curtains
                                                </span>
                                                <span className="text-sm">
                                                    8 items
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">
                                                    Others
                                                </span>
                                                <span className="text-sm">
                                                    15 items
                                                </span>
                                            </div>
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

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Daily Activity</CardTitle>
                                        <CardDescription>
                                            Today's laundry activity summary
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">
                                                    New Registrations
                                                </span>
                                                <span className="text-sm">
                                                    12
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">
                                                    Items Processed
                                                </span>
                                                <span className="text-sm">
                                                    87
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">
                                                    Completed Orders
                                                </span>
                                                <span className="text-sm">
                                                    9
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">
                                                    Revenue Today
                                                </span>
                                                <span className="text-sm">
                                                    ₦45,000
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-4"
                                        >
                                            <Calendar className="mr-2 h-4 w-4" />
                                            View Daily Reports
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="analytics" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Analytics</CardTitle>
                                    <CardDescription>
                                        Detailed analytics and performance
                                        metrics
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="h-[400px] flex items-center justify-center">
                                    <div className="text-center">
                                        <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                                        <h3 className="mt-4 text-lg font-medium">
                                            Analytics Dashboard
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Detailed analytics charts and
                                            metrics would be displayed here.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="reports" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Reports</CardTitle>
                                    <CardDescription>
                                        Generate and view system reports
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="h-[400px] flex items-center justify-center">
                                    <div className="text-center">
                                        <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                                        <h3 className="mt-4 text-lg font-medium">
                                            Reports Center
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Daily, weekly, and monthly reports
                                            would be available here.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
