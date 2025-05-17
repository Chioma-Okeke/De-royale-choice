'use client'

import ContactService from '@/app/services/contact-service'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { getUnreadInquiriesQueryOpts } from '@/lib/query-options'
import { useRouter } from '@bprogress/next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Bell } from 'lucide-react'
import React from 'react'

function NotificationDropdown() {
    const router = useRouter()
    const { data: inquiries, isLoading, error } = useQuery(getUnreadInquiriesQueryOpts)
    const queryClient = useQueryClient()
    const {user} = useAuth()

    const markAllAsRead = async () => {
        const contactService = new ContactService()
        await contactService.markUnReadMessages()
        queryClient.invalidateQueries({queryKey: ['Contacts']})
    }

    const navigateToInquiriesPage = () => {
        router.push(`/dashboard/${user?.role}/inquiries`)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {inquiries && inquiries.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-brand-red">
                            {inquiries.length}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {inquiries && inquiries.length > 0 ? (
                    <>
                        {inquiries.map((inq) => (
                            <DropdownMenuItem key={inq._id} onClick={navigateToInquiriesPage}>
                                {inq.name}: {inq.message.slice(0, 30)}...
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={markAllAsRead}>
                            Mark all as read
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NotificationDropdown