"use client"

import { useState } from "react"
import { Bell, User } from "lucide-react"
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

interface HeaderProps {
  title: string
  role: "admin" | "staff" | "limited"
  username: string
}

export function Header({ title, role, username }: HeaderProps) {
  const [notifications, setNotifications] = useState(3)

  const clearNotifications = () => {
    setNotifications(0)
  }

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <h1 className="text-xl font-semibold text-brand-navy">{title}</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-brand-red">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications > 0 ? (
                <>
                  <DropdownMenuItem>New customer registration</DropdownMenuItem>
                  <DropdownMenuItem>Receipt printed successfully</DropdownMenuItem>
                  <DropdownMenuItem>Daily report available</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearNotifications}>Mark all as read</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
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
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Badge variant="outline" className="mr-2">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Badge>
                <span>Role</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
