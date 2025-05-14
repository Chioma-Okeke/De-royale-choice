"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Search,
    Printer,
    ClipboardList,
    Settings,
    LogOut,
    Menu,
    ShoppingBag,
    Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "@/components/Logo/logo";
import { useAuth } from "@/hooks/use-auth";

interface SidebarProps {
    role: "admin" | "staff" | "limited";
}

export function Sidebar({ role }: SidebarProps) {
    const { user, logoutUser } = useAuth()
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    // const role = user?.role
    console.log(user)
    console.log(role)
    const baseDashboardPath = `/dashboard/${role}`;

    const handleLogout = () => {
        logoutUser()
    };

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: baseDashboardPath,
            active: pathname === baseDashboardPath,
            roles: ["admin", "staff", "limited"],
        },
        {
            label: "Take order",
            icon: Users,
            href: `${baseDashboardPath}/customers/register`,
            active: pathname === `${baseDashboardPath}/customers/register`,
            roles: ["staff", "limited"],
        },
        {
            label: "Search",
            icon: Search,
            href: `${baseDashboardPath}/customers/search`,
            active: pathname === `${baseDashboardPath}/customers/search`,
            roles: ["admin", "staff"],
        },
        {
            label: "Daily Entries",
            icon: ClipboardList,
            href: `${baseDashboardPath}/reports`,
            active: pathname === `${baseDashboardPath}/reports`,
            roles: ["admin", "staff"],
        },
        {
            label: "Inventory",
            icon: ShoppingBag,
            href: `${baseDashboardPath}/inventory`,
            active: pathname === `${baseDashboardPath}/inventory`,
            roles: ["admin"],
        },
        {
            label: "Inquires",
            icon: Phone,
            href: `${baseDashboardPath}/inquiries`,
            active: pathname === `${baseDashboardPath}/inquiries`,
            roles: ["admin", "staff"],
        },
        // {
        //     label: "Settings",
        //     icon: Settings,
        //     href: "/settings",
        //     active: pathname === "/settings",
        //     roles: ["admin"],
        // },
    ];

    return (
        <div className="fixed top-0 h-screen bg-white z-30">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="icon" className="ml-2 mt-2">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b">
                            <div className="flex items-center gap-2">
                                <Logo size="sm" withText={false} />
                                <span className="font-semibold">
                                    DE UNIQUE DRY CLEANERS
                                </span>
                            </div>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="p-4">
                                <nav className="grid gap-2">
                                    {routes
                                        .filter((route) => {
                                            if (role) {
                                                route.roles.includes(role)
                                            }
                                        }
                                        )
                                        .map((route) => (
                                            <Link
                                                key={route.href}
                                                href={route.href}
                                                onClick={() => setOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                                                    route.active
                                                        ? "bg-brand-navy text-white font-medium"
                                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                                )}
                                            >
                                                <route.icon className="h-4 w-4" />
                                                {route.label}
                                            </Link>
                                        ))}
                                </nav>
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-brand-red hover:text-red-700 hover:bg-red-50"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="hidden lg:flex h-screen border-r bg-white flex-col w-64">
                <div className="p-6 border-b">
                    <div className="flex items-center gap-2">
                        <Logo size="sm" />
                    </div>
                </div>
                <ScrollArea className="flex-1 p-4">
                    <nav className="grid gap-2">
                        {routes
                            .filter((route) => {
                                return role ? route.roles.includes(role) : false;
                            })
                            .map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                                        route.active
                                            ? "bg-brand-navy text-white font-medium"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                    )}
                                >
                                    <route.icon className="h-4 w-4" />
                                    {route.label}
                                </Link>
                            ))}
                    </nav>
                </ScrollArea>
                <div className="p-4 border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-brand-red hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
