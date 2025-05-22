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
import { Search, Eye, Printer, Filter, Pen, Trash2 } from "lucide-react";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrdersQueryOpts } from "@/lib/query-options";
import { useRouter } from "@bprogress/next";
import { useAuth } from "@/hooks/use-auth";
import { OrderStatusPill } from "@/components/shared/order-status-pill";
import { IGetOrdersContent } from "@/types";
import { ConfirmDeleteDialog } from "@/components/modals/delete-modal";
import OrderService from "@/app/services/order-service";
import { toast } from "sonner";

export default function CustomerSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("name"); // Not yet used in API
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const offset = (currentPage - 1) * pageSize;
    const { user } = useAuth()
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient()
    const [selectedOrder, setSelectedOrder] = useState<IGetOrdersContent | null>(null)

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
    console.log(totalPages, "pages total")

    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page
        refetch();
    };

    const editOrder = (id: string) => {
        router.push(`/dashboard/admin/orders/${id}`)
    };

    const printReceipt = (id: string) => {
        toast.success("Printing Receipt", {
            description: `Printing receipt for registration ${id}`,
        });
        router.push(`/dashboard/admin/receipts/${id}`)
    };



    const { mutate, isPending } = useMutation({
        mutationFn: async (order: IGetOrdersContent) => {
            const orderService = new OrderService()
            await orderService.deleteOrder(order.orderId)
        },
        mutationKey: ["deleteOrder", selectedOrder?.orderId],
        onSuccess: () => {
            queryClient.invalidateQueries(getOrdersQueryOpts({
                dateFrom: "",
                dateTo: "",
                limit: pageSize,
                offset: offset,
            }))
            toast.success("Oder Deleted", {
                description: `Order has been deleted successfully.`,
            });
            setOpen(false)
            setSelectedOrder(null)
        },
        onError: (error) => {
            console.error("Error deleting Order:", error);
            toast.error("Order Deletion Failed", {
                description: "The order could not be deleted due to an error."
            })
        }
    })

    const handleDeleteConfirmation = (order: IGetOrdersContent) => {
        setSelectedOrder(order)
        setOpen(true)
    }

    const handleDelete = (order: IGetOrdersContent) => {
        mutate(order)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Customers List" />
                <main className="p-4 md:p-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Customer Records</CardTitle>
                            <CardDescription>
                                Find customer records by name, phone number, or registration ID.
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
                                                placeholder="Search by either customer name, phone Number or receiptId"
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

                    {filteredEntries?.registrations && filteredEntries?.registrations.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Search Results</CardTitle>
                                <CardDescription>
                                    Found {filteredEntries?.total} matching records
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
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
                                        {filteredEntries.registrations.length > 0 && filteredEntries.registrations.map((result) => (
                                            <TableRow key={result.receiptId}>
                                                <TableCell className="font-medium">{result.receiptId}</TableCell>
                                                <TableCell>{result.customer}</TableCell>
                                                <TableCell className="hidden md:table-cell">{result.phone}</TableCell>
                                                <TableCell className="hidden md:table-cell">{result.date}</TableCell>
                                                <TableCell>{result.items}</TableCell>
                                                <TableCell>{result.amount}</TableCell>
                                                <TableCell>{result.deposit?.toLocaleString() ? `₦${result.deposit?.toLocaleString()}` : "N/A"}</TableCell>
                                                <TableCell>{result.balance?.toLocaleString() ? `₦${result.balance?.toLocaleString()}` : "N/A"}</TableCell>
                                                <TableCell><OrderStatusPill status={result.status} /></TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {user?.role === "admin" && result.status === "Pending" && <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => editOrder(result.orderId)}
                                                        >
                                                            <Pen className="h-4 w-4" />
                                                        </Button>}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => printReceipt(result.orderId)}
                                                        >
                                                            <Printer className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            icon={Trash2}
                                                            onClick={() => handleDeleteConfirmation(result)}>
                                                            <span className="sr-only">
                                                                Delete
                                                            </span>
                                                        </Button>

                                                        <ConfirmDeleteDialog
                                                            open={open}
                                                            onClose={() => {
                                                                setOpen(false);
                                                                setSelectedOrder(null);
                                                            }}
                                                            onConfirm={() => {
                                                                if (selectedOrder) {
                                                                    handleDelete(selectedOrder)
                                                                }
                                                            }
                                                            }
                                                            title={`Delete order "${selectedOrder?.receiptId}"?`}
                                                            description="This will permanently delete the order. Are you sure?"
                                                            loading={isPending}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

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
                    )}
                </main>
            </MainDashboardContainer>
        </div>
    );
}
