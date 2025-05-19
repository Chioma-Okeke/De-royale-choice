'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { Dialog, DialogTrigger, DialogTitle, DialogHeader, DialogContent, DialogFooter, DialogClose } from "../ui/dialog"
import { IGetContactsContent } from "@/models/types"
import { useState } from "react"
import ContactService from "@/app/services/contact-service"
import { useQueryClient } from "@tanstack/react-query"
import { getContactQueryOpts } from "@/lib/query-options"

type InquiryDetailsModalProps = {
    inquiry: IGetContactsContent
}

const InquiryDetailsModal = ({ inquiry }: InquiryDetailsModalProps) => {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const handleOpenChange = async (value: boolean) => {
        setOpen(value)
        if (value && !inquiry.isRead) {
            const contactService = new ContactService()
            await contactService.markMessageAsRead(inquiry._id)
            queryClient.invalidateQueries(getContactQueryOpts)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant={"default"}>View</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-2 !text-start">
                    <DialogTitle id="modal-title">Inquiry Details</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 mt-4">
                    <p><span className="font-semibold">Name:</span> {inquiry.name}</p>
                    <div className="flex items-center justify-between">
                        <span><span className="font-semibold">Phone number:</span> {inquiry.phoneNumber}</span>
                        <Link href={`tel:${inquiry.phoneNumber}`} target="_blank" className="text-sm font-medium rounded-md border-gray-400 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Call</Link>
                    </div>
                    <p><span className="font-semibold">Subject:</span> {inquiry.subject}</p>
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold">Message</span>
                        <span>{inquiry.message}</span>
                    </div>
                </div>
                <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                        <Button variant={"default"}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default InquiryDetailsModal