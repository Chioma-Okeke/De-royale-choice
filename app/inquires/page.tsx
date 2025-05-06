import { Header } from "@/components/dashboard/header";
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
import ContactService from "../services/contact-service";
import { IGetContactsContent } from "@/models/types";
import InquiryDetailsModal from "@/components/modals/inquiries-details-modal";

async function InquiriesPage() {
    const contactService = new ContactService();
    let inquiries: IGetContactsContent[] = [];
    try {
    inquiries = await contactService.getContacts();
    } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    }

    return (
        <div>
            <Sidebar role="staff" />
            <MainDashboardContainer>
                <Header title="Inquires" role="staff" username="staff" />
                <main className="p-4 md:p-6 space-y-6">
                    <h1>This is the contact page for the company</h1>
                    <p>ALl contact message sent will be seen here</p>
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
                                {inquiries.map((entry: IGetContactsContent) => (
                                    <TableRow key={entry.name}>
                                        <TableCell className="font-medium">
                                            {entry.name}
                                        </TableCell>
                                        <TableCell>{entry.phoneNumber}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {entry.subject}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {entry.message}
                                        </TableCell>
                                        <TableCell>
                                            <InquiryDetailsModal inquiry={entry}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </MainDashboardContainer>
        </div>
    );
}

export default InquiriesPage;
// export const dynamic = "force-dynamic";
