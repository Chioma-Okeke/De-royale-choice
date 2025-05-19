import { cn } from "@/lib/utils";

export function OrderStatusPill ({status}: {status: string}) {
    return (
        <p>
            <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ", {
                "bg-green-100 text-green-800": status.toLowerCase() === "completed",
                "bg-blue-100 text-blue-800": status.toLowerCase() === "pending"
            })}>
               {status}
            </span>
        </p>
    )
}