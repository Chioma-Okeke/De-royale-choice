'use client'

import { Header } from "@/components/dashboard/header/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";
import { IGetContactsContent } from "@/models/types";
import InquiryDetailsModal from "@/components/modals/inquiries-details-modal";
import { useQuery } from "@tanstack/react-query";
import { getContactQueryOpts } from "@/lib/query-options";
import { TableBodySkeleton } from "@/components/shared/table-skeleton";

function InquiriesPage() {
    const { data: inquiries, isLoading } = useQuery(getContactQueryOpts)
    const columns = 5

    return (
        <div>
            <Sidebar role="staff" />
            <MainDashboardContainer>
                <Header title="Inquires" role="staff" username="staff" />
                <main className="p-4 md:p-6 space-y-6">
                    <p>All contact information for inquiries made on the landing page.</p>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Phone number</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Subject
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Message
                                    </TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableBodySkeleton
                                        rows={4}
                                        columns={columns}
                                    />
                                ) : (inquiries && inquiries?.length > 0 ? inquiries?.map((entry: IGetContactsContent) => (
                                    <TableRow key={entry.name} className={!entry.isRead ? "font-bold" : ""}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {!entry.isRead && <div className="w-2 h-2 rounded-full bg-primary p-1"></div>}
                                                {entry.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{entry.phoneNumber}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {entry.subject}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {entry.message}
                                        </TableCell>
                                        <TableCell>
                                            <InquiryDetailsModal  inquiry={entry} />
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={columns} className="text-center py-10 text-lg text-muted-foreground">
                                            No contacts found.
                                        </TableCell>
                                    </TableRow>
                                )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </MainDashboardContainer>
        </div>
    );
}

export default InquiriesPage;
export const dynamic = "force-dynamic";
