
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@bprogress/next";
import { Printer, Search, Users } from "lucide-react";
import Link from "next/link";

export function HeaderCard({role}: {role: "admin" | "staff"}) {
    const router = useRouter()
    return (
        <div className="grid gap-4 grid-cols-2">
            <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-6 h-full">
                    <div className="flex flex-col space-y-2 justify-between h-full">
                        <Users className="h-12 w-12 text-emerald-600" />
                        <h3 className="text-2xl font-bold">
                            Take new order
                        </h3>
                        <p className="text-muted-foreground">
                            Register a new customer and their
                            laundry items.
                        </p>
                        <Button
                            asChild
                            className="mt-4 bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                            onClick={() => router.push(`/dashboard/${role}/orders/register`)}
                        >
                            Take order
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6 h-full">
                    <div className="flex flex-col space-y-2 justify-between h-full">
                        <Printer className="h-12 w-12 text-emerald-600" />
                        <h3 className="text-2xl font-bold">
                            Print Receipts
                        </h3>
                        <p className="text-muted-foreground">
                            Print customer receipts and item tags
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            className="mt-4"
                        >
                            <Link href={`/dashboard/${role}/orders/search`}>
                                Go to Printing
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* <Card>
                <CardContent className="p-6 h-full">
                    <div className="flex flex-col space-y-2 justify-between h-full">
                        <Search className="h-12 w-12 text-emerald-600" />
                        <h3 className="text-2xl font-bold">
                            Search
                        </h3>
                        <p className="text-muted-foreground">
                            Find customer records and transactions
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            className="mt-4"
                        >
                            <Link href={`/dashboard/${user?.role}/customers/search`}>
                                Search Records
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card> */}
        </div>
    )
}