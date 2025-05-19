"use client"


import { SidebarTrigger } from "@/components/ui/sidebar"
import NotificationDropdown from "./notification-dropdown"
import UserProfileCard from "./user-profile-card"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="hover:scale-110 transition ease-in-out duration-300"/>
          <h1 className="text-xl font-semibold text-brand-navy">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <NotificationDropdown />

          <UserProfileCard />
        </div>
      </div>
    </header>
  )
}
