import { cn } from "@/lib/utils";
import React from "react";

function MainDashboardContainer({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={cn("flex-1 max-lg:pl-12 pl-[255px]", className)}>{children}</div>;
}

export default MainDashboardContainer;
