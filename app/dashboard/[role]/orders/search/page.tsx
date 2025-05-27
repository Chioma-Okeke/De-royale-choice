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
import { useRouter } from "@bprogress/next";
import { useAuth } from "@/hooks/use-auth";
import { OrderStatusPill } from "@/components/shared/order-status-pill";
import { useParams } from "next/navigation";

export default function OrdersSearch() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("name"); // Not yet used in API
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const offset = (currentPage - 1) * pageSize;
    const params = useParams()
    const role = params.role as "admin" | "staff"

    const {
        data: filteredEntries,
        refetch,
        isLoading,
        isFetching,
    } = useQuery(
        getOrdersQueryOpts({
            search: searchTerm,
            limit: pageSize,
            offset,
        }, false)
    );

    useEffect(() => {
        if (searchTerm) {
            refetch();
        }
    }, [currentPage]);

    const totalCount = filteredEntries?.registrations.length || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        refetch();
    };

    const printReceipt = (id: string) => {
        toast({
            title: "Printing Receipt",
            description: `Printing receipt for registration ${id}`,
        });
        router.push(`/dashboard/${role}/receipts/${id}`)
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Receipts" />
                <main className="p-4 md:p-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Orders Records</CardTitle>
                            <CardDescription>
                                Find orders by receipt ID.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    <div className="flex-1 sm:flex-[2]">
                                        <Label htmlFor="search-term">Search Term</Label>
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="search-term"
                                                placeholder="Search by receipt Id"
                                                className="pl-8"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-end">
                                        <Button
                                            type="submit"
                                            disabled={isLoading || isFetching}
                                        >
                                            {isLoading || isFetching ? "Searching..." : "Search"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* /{filteredEntries?.registrations && filteredEntries?.registrations.length > 0 && ( */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Results</CardTitle>
                            <CardDescription>
                                Found {filteredEntries ? filteredEntries?.total : 0} matching records
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {filteredEntries && filteredEntries.registrations.length > 0 ?
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Reg ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="hidden md:table-cell">Phone</TableHead>
                                            <TableHead className="hidden md:table-cell">Date</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Deposit</TableHead>
                                            <TableHead>Balance</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredEntries && filteredEntries.registrations.length > 0 && filteredEntries.registrations.map((result) => (
                                            <TableRow key={result.receiptId}>
                                                <TableCell className="font-medium">{result.receiptId}</TableCell>
                                                <TableCell>{result.customer}</TableCell>
                                                <TableCell className="hidden md:table-cell">{result.phone}</TableCell>
                                                <TableCell className="hidden md:table-cell">{result.date}</TableCell>
                                                <TableCell>{result.items}</TableCell>
                                                <TableCell>{result.amount}</TableCell>
                                                <TableCell>{result.deposit?.toLocaleString() ? `₦${result.deposit?.toLocaleString()}` : "N/A"}</TableCell>
                                                <TableCell>{result.balance?.toLocaleString() ? `₦${result.balance?.toLocaleString()}` : "N/A"}</TableCell>
                                                <TableCell><OrderStatusPill status={result.status}/></TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => printReceipt(result.orderId)}
                                                        >
                                                            <Printer className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table> : (
                                    <div className="text-center py-10 text-lg text-muted-foreground">
                                        No Orders found.
                                    </div>
                                )}

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
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing page {currentPage} of {totalPages}
                            </div>
                        </CardFooter>
                    </Card>
                    {/* )} */}
                </main>
            </MainDashboardContainer>
        </div>
    );
}
