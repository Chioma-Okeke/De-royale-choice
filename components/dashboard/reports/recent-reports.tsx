'use client'

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOrdersQueryOpts } from "@/lib/query-options";
import { TableBodySkeleton } from "@/components/shared/table-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import moment from "moment";
import { useRouter } from "@bprogress/next";
import { OrderStatusPill } from "@/components/shared/order-status-pill";

export function RecentReports() {
    const { user } = useAuth()
    const column = 6;
    const router = useRouter()

    const { data: recentRegistrations, isLoading } = useQuery(
        getOrdersQueryOpts({
            dateFrom: moment().format("YYYY-MM-DD"),
            dateTo: moment().format("YYYY-MM-DD"),
            limit: 5,
            offset: 0,
        })
    );


    return (
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
                                <TableHead>Amount</TableHead>
                                                            <TableHead>Deposit</TableHead>
                                                            <TableHead>Balance</TableHead>
                                                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="max-w-full">
                        {isLoading ? (
                            <TableBodySkeleton rows={5} columns={column} />
                        ) : recentRegistrations && recentRegistrations.registrations.length > 0 ? recentRegistrations.registrations.map((registration) => (
                            <TableRow key={registration.receiptId}>
                                <TableCell className="font-medium">
                                    {registration.receiptId}
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
                                                                        <TableCell>₦{registration.amount.toLocaleString()}</TableCell>
                                                                        <TableCell>{registration.deposit?.toLocaleString() ? `₦${registration.deposit?.toLocaleString()}` : "N/A"}</TableCell>
                                                                        <TableCell>{registration.balance?.toLocaleString() ? `₦${registration.balance?.toLocaleString()}` : "N/A"}</TableCell>
                                                                        <TableCell><OrderStatusPill status={registration.status}/></TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => 
                                            router.push(`/dashboard/${user?.role}/receipts/${registration.orderId}`)}
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                        <span className="sr-only">
                                            View details
                                        </span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={column} className="text-center py-10 text-lg text-muted-foreground">
                                    No Orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/${user?.role}/reports`}>View All Orders</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
