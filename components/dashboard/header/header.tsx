"use client"


import NotificationDropdown from "./notification-dropdown"
import UserProfileCard from "./user-profile-card"

interface HeaderProps {
  title: string
  role: "admin" | "staff" | "limited"
  username: string
}

export function Header({ title, role, username }: HeaderProps) {

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <h1 className="text-xl font-semibold text-brand-navy">{title}</h1>
        <div className="flex items-center gap-4">
          <NotificationDropdown/>

          <UserProfileCard role={role} username={username}/>
        </div>
      </div>
    </header>
  )
}
