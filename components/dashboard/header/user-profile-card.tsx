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

interface UserProfileCardProps {
    role: string
    username: string
}

function UserProfileCard({ role, username }: UserProfileCardProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='border-0 outline-none ring-0'>
                <Button variant="ghost" size="icon" className="relative rounded-full border-0 outline-none focus:ring-0">
                    <Avatar>
                        <AvatarFallback className="bg-brand-navy text-white">
                            {username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {role === "admin" && <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>}
                <DropdownMenuItem>
                    <Badge variant="outline" className="mr-2">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Badge>
                    <span>Role</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='py-0'>
                    <Button containerClass='w-full' className='w-full px-4 py-1' variant="ghost">
                        Log out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfileCard