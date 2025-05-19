"use client";

import { useState, useEffect } from "react";
import {
    Pagination, PaginationContent, PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious, PaginationEllipsis,
} from "@/components/ui/pagination";
import { Header } from "@/components/dashboard/header/header";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardFooter,
    CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow,
} from "@/components/ui/table";
import { Search, Eye, Printer, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { useQuery } from "@tanstack/react-query";
import { getOrdersQueryOpts } from "@/lib/query-options";
import { TableBodySkeleton } from "@/components/shared/table-skeleton";

export default function OutstandingOrders() {
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const column = 9

    const {
        data: filteredEntries,
        isLoading,
    } = useQuery(
        getOrdersQueryOpts({
            status: "Pending",
        })
    );

    const totalCount = filteredEntries?.registrations.length || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="flex min-h-screen bg-gray-50 ">
            <MainDashboardContainer>
                <Header
                    title="Outstanding Orders"
                />
                <main className="p-4 md:p-6 ">
                    <Card>
                        <CardHeader>
                            <CardTitle>Outstanding Orders</CardTitle>
                            <CardDescription>View all pending orders</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Table */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Reg ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Deposit</TableHead>
                                            <TableHead>Balance</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="overflow-x-auto">
                                        {isLoading ? (
                                            <TableBodySkeleton rows={8} columns={column} />
                                        ) : filteredEntries && filteredEntries.registrations.length > 0 ? (
                                            filteredEntries.registrations.map((entry) => (
                                                <TableRow key={entry.receiptId}>
                                                    <TableCell className="font-medium">{entry.receiptId}</TableCell>
                                                    <TableCell>{entry.customer}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{entry.phone}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{entry.date}</TableCell>
                                                    <TableCell>{entry.items}</TableCell>
                                                    <TableCell>₦{entry.amount.toLocaleString()}</TableCell>
                                                    <TableCell>{entry.deposit?.toLocaleString() ? `₦${entry.deposit?.toLocaleString()}` : "N/A"}</TableCell>
                                                    <TableCell>{entry.balance?.toLocaleString() ? `₦${entry.balance?.toLocaleString()}` : "N/A"}</TableCell>
                                                    <TableCell>{entry.status}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={column} className="text-center py-10 text-lg text-muted-foreground">
                                                    No Orders found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                {/* Pagination */}
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                                                }}
                                            />
                                        </PaginationItem>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={currentPage === page}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(page);
                                                    }}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        {totalPages > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                                        <PaginationItem>
                                            <PaginationNext
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                                }}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </MainDashboardContainer>
        </div>

    );
}
