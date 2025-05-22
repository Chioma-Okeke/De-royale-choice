'use client'

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Pagination, PaginationContent, PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious, PaginationEllipsis,
} from "@/components/ui/pagination";
import { Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrdersQueryOpts } from "@/lib/query-options";
import { useState } from "react";
import { TableBodySkeleton } from "@/components/shared/table-skeleton";
import { Button } from "@/components/ui/button";
import { OrderStatusPill } from "@/components/shared/order-status-pill";
import { ConfirmDeleteDialog } from "@/components/modals/delete-modal";
import { IGetOrdersContent } from "@/types";
import OrderService from "@/app/services/order-service";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export function ReportCard() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { user } = useAuth()

    const pageSize = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const offset = (currentPage - 1) * pageSize;
    const queryClient = useQueryClient()

    const { data: filteredEntries, isLoading, isFetching } = useQuery(
        getOrdersQueryOpts({
            dateFrom: startDate,
            dateTo: endDate,
            limit: pageSize,
            offset: offset,
        })
    );

    const totalAmount = filteredEntries?.registrations.reduce((sum, entry) => {
        return sum + entry.amount;
    }, 0);

    const totalCount = filteredEntries?.total || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    const filterEntries = () => {
        queryClient.invalidateQueries(getOrdersQueryOpts({
            dateFrom: startDate,
            dateTo: endDate,
            limit: pageSize,
            offset: offset,
        }))
    }
    const resetFilter = () => {
        setStartDate("")
        setEndDate("")
        queryClient.invalidateQueries(getOrdersQueryOpts({
            dateFrom: "",
            dateTo: "",
            limit: pageSize,
            offset: offset,
        }))
    }

    const column = 10;

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>View, manage and filter all orders </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 overflow-x-auto w-full">
                {/* Date Filter */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                        <div className="flex gap-4">
                            <div className="relative flex-1 flex items-center gap-1">
                                <span className="w-[25%]">Start Date</span>
                                <Input
                                    id="start-date"
                                    type="date"
                                    className="pl-8"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="relative flex-1 flex items-center gap-1">
                                <span className="w-[25%]">End Date</span>
                                <Input
                                    id="end-date"
                                    type="date"
                                    className="pl-8"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button variant="outline" onClick={filterEntries}>Apply</Button>
                            </div>
                            <div>
                                <Button variant="outline" disabled={!startDate && !endDate} onClick={resetFilter}>Clear</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto w-full rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Reg ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden md:table-cell">Phone</TableHead>
                                <TableHead className="hidden md:table-cell">Time</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Deposit</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-x-auto">
                            {isLoading || isFetching ? (
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
                                        <TableCell><OrderStatusPill status={entry.status} /></TableCell>
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
                    {/* Summary */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Total Entries:</span>
                            <span className="ml-2 font-medium">{filteredEntries?.registrations.length}</span>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Total Items:</span>
                            <span className="ml-2 font-medium">{filteredEntries?.total}</span>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Total Amount:</span>
                            <span className="ml-2 font-medium">₦{totalAmount?.toLocaleString()}</span>
                        </div>
                    </div>

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
    );
}
