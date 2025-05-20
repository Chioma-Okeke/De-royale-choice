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
    ReceiptText,
    HandCoins,
    Shirt,
    Contact,
    CircleUserRound,
    UserRoundSearch,
    ClockArrowDown,
    BookText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "@/components/Logo/logo";
import { useAuth } from "@/hooks/use-auth";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getUnreadInquiriesQueryOpts } from "@/lib/query-options";

interface SidebarProps {
    role: "admin" | "staff";
}

export function SidebarNav({ role }: SidebarProps) {
    const { user, logoutUser } = useAuth()
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { data: inquiries } = useQuery(getUnreadInquiriesQueryOpts)
    const baseDashboardPath = `/dashboard/${role}`;

    const handleLogout = () => {
        logoutUser()
    };

    const groupedRoutes = [
        {
            title: "General",
            routes: [
                {
                    label: "Dashboard",
                    icon: LayoutDashboard,
                    href: baseDashboardPath,
                    active: pathname === baseDashboardPath,
                    roles: ["admin", "staff"],
                },
            ],
            roles: ["admin", "staff"],
        },
        {
            title: "Orders",
            routes: [
                {
                    label: "All Order",
                    icon: BookText,
                    active: pathname === `${baseDashboardPath}/reports`,
                    href: `${baseDashboardPath}/reports`,
                    roles: ["staff", "admin"],
                },
                {
                    label: "New Order",
                    icon: HandCoins,
                    active: pathname === `${baseDashboardPath}/orders/register`,
                    href: `${baseDashboardPath}/orders/register`,
                    roles: ["staff"],
                },
                {
                    label: "Outstanding Orders",
                    icon: ClockArrowDown,
                    active: pathname === `${baseDashboardPath}/orders/outstanding`,
                    href: `${baseDashboardPath}/orders/outstanding`,
                    roles: ["staff", "admin"],
                },
                {
                    label: "Receipts",
                    icon: ReceiptText,
                    href: `${baseDashboardPath}/orders/search`,
                    active: pathname === `${baseDashboardPath}/orders/search`,
                    roles: ["staff", "admin"],
                },
            ],
            roles: ["staff", "admin"],
        },
        {
            title: "Customer",
            routes: [
                {
                    label: "Customer List",
                    icon: UserRoundSearch,
                    href: `${baseDashboardPath}/customers/search`,
                    active: pathname === `${baseDashboardPath}/customers/search`,
                    roles: ["admin"],
                },
            ],
            roles: ["admin"],
        },
        {
            title: "Management",
            routes: [
                {
                    label: "Inventory",
                    icon: Shirt,
                    href: `${baseDashboardPath}/inventory`,
                    active: pathname === `${baseDashboardPath}/inventory`,
                    roles: ["admin"],
                },
                {
                    label: "Inquiries",
                    icon: Contact,
                    href: `${baseDashboardPath}/inquiries`,
                    active: pathname === `${baseDashboardPath}/inquiries`,
                    roles: ["admin", "staff"],
                },
                {
                    label: "Users List",
                    icon: CircleUserRound,
                    href: `${baseDashboardPath}/users`,
                    active: pathname === `${baseDashboardPath}/users`,
                    roles: ["admin"],
                },
            ],
            roles: ["admin", "staff"],
        },
        {
            title: "Settings",
            routes: [
                {
                    label: "Settings",
                    icon: Settings,
                    href: `${baseDashboardPath}/settings`,
                    active: pathname === `${baseDashboardPath}/settings`,
                    roles: ["admin"],
                },
            ],
            roles: ["admin"],
        },
    ];

    return (
        <Sidebar>
            <SidebarContent className="h-screen border-r bg-white z-30">
                <div className="p-6 border-b">
                    <div className="flex items-center gap-2">
                        <Logo size="sm" />
                    </div>
                </div>
                <ScrollArea>
                    {groupedRoutes.filter((groupRoute) => {
                        return role ? groupRoute.roles.includes(role) : false;
                    }).map((groupRoute) => {
                        return (
                            <SidebarGroup >
                                <SidebarGroupLabel>{groupRoute.title}</SidebarGroupLabel>
                                <SidebarGroupContent className="pr-2">
                                    <SidebarMenu>
                                        {groupRoute.routes.filter((route) => {
                                            return role ? route.roles.includes(role) : false;
                                        }).map((route) => (
                                            <SidebarMenuItem className={cn(
                                                "flex items-center gap-2 px-3 py-1 text-sm rounded-md",
                                                route.active
                                                    ? "bg-brand-navy text-white font-medium"
                                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                            )} key={route.label}>
                                                <SidebarMenuButton asChild>
                                                    <a className="p-0" href={route.href}>
                                                        <route.icon />
                                                        <span>{route.label}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                                {route.label === "Inquiries" && inquiries && inquiries?.length > 0 && <SidebarMenuBadge className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-brand-red text-white">{inquiries?.length}</SidebarMenuBadge>}
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        )
                    })}
                </ScrollArea>
                <SidebarFooter className="border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-brand-red hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
