'use client'

import React from 'react'
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from '@bprogress/next'

function UserProfileCard() {
    const { logoutUser, user } = useAuth()
    const role = user?.role
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='border-0 outline-none ring-0'>
                <Button variant="ghost" size="icon" className="relative rounded-full border-0 outline-none focus:ring-0">
                    <Avatar>
                        <AvatarFallback className="bg-brand-navy text-white">
                            {role?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Badge variant="outline" className="mr-2">
                        {role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}
                    </Badge>
                    <span>Role</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/admin/settings")}>
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='py-0'>
                    <Button onClick={() => logoutUser()} containerClass='w-full' className='w-full px-4 py-1' variant="ghost">
                        Log out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfileCard