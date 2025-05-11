"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header/header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Printer, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";

export default function CustomerSearch() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("name");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Mock data for search results
    const mockCustomers = [
        {
            id: "REG-1234",
            name: "John Doe",
            phone: "080-1234-5678",
            items: 5,
            date: "2023-04-18",
            status: "Completed",
            amount: "₦5,000",
        },
        {
            id: "REG-2345",
            name: "Jane Smith",
            phone: "080-8765-4321",
            items: 3,
            date: "2023-04-17",
            status: "Processing",
            amount: "₦3,500",
        },
        {
            id: "REG-3456",
            name: "Robert Johnson",
            phone: "080-2468-1357",
            items: 7,
            date: "2023-04-16",
            status: "Pending",
            amount: "₦7,200",
        },
        {
            id: "REG-4567",
            name: "Emily Davis",
            phone: "080-1357-2468",
            items: 2,
            date: "2023-04-15",
            status: "Completed",
            amount: "₦2,800",
        },
        {
            id: "REG-5678",
            name: "Michael Wilson",
            phone: "080-9876-5432",
            items: 4,
            date: "2023-04-14",
            status: "Completed",
            amount: "₦4,500",
        },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);

        // Simulate API call with setTimeout
        setTimeout(() => {
            let results = [];

            if (searchTerm.trim() !== "") {
                const term = searchTerm.toLowerCase();

                results = mockCustomers.filter((customer) => {
                    if (searchType === "name") {
                        return customer.name.toLowerCase().includes(term);
                    } else if (searchType === "phone") {
                        return customer.phone.toLowerCase().includes(term);
                    } else if (searchType === "id") {
                        return customer.id.toLowerCase().includes(term);
                    }
                    return false;
                });
            }

            setSearchResults(results);
            setIsSearching(false);

            toast({
                title: `${results.length} results found`,
                description:
                    results.length > 0
                        ? "Displaying search results below."
                        : "No matching records found. Try a different search term.",
            });
        }, 800);
    };

    const viewDetails = (id) => {
        toast({
            title: "Viewing Details",
            description: `Viewing details for registration ${id}`,
        });
        // In a real app, this would navigate to a details page
    };

    const printReceipt = (id) => {
        toast({
            title: "Printing Receipt",
            description: `Printing receipt for registration ${id}`,
        });
        // In a real app, this would trigger the printing functionality
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar role="staff" />
            <MainDashboardContainer>
                <Header title="Search Records" role="staff" username="staff" />
                <main className="p-4 md:p-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Customer Records</CardTitle>
                            <CardDescription>
                                Find customer records by name, phone number, or
                                registration ID
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    <div className="flex-1">
                                        <Label htmlFor="search-type">
                                            Search By
                                        </Label>
                                        <Select
                                            value={searchType}
                                            onValueChange={setSearchType}
                                        >
                                            <SelectTrigger id="search-type">
                                                <SelectValue placeholder="Select search type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="name">
                                                    Customer Name
                                                </SelectItem>
                                                <SelectItem value="phone">
                                                    Phone Number
                                                </SelectItem>
                                                <SelectItem value="id">
                                                    Registration ID
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex-1 sm:flex-[2]">
                                        <Label htmlFor="search-term">
                                            Search Term
                                        </Label>
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="search-term"
                                                placeholder={`Enter ${searchType === "name"
                                                        ? "customer name"
                                                        : searchType === "phone"
                                                            ? "phone number"
                                                            : "registration ID"
                                                    }`}
                                                className="pl-8"
                                                value={searchTerm}
                                                onChange={(e) =>
                                                    setSearchTerm(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-end">
                                        <Button
                                            type="submit"
                                            disabled={isSearching}
                                        >
                                            {isSearching
                                                ? "Searching..."
                                                : "Search"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {searchResults.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Search Results</CardTitle>
                                <CardDescription>
                                    Found {searchResults.length} matching
                                    records
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Reg ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Phone
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Date
                                            </TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {searchResults.map((result) => (
                                            <TableRow key={result.id}>
                                                <TableCell className="font-medium">
                                                    {result.id}
                                                </TableCell>
                                                <TableCell>
                                                    {result.name}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {result.phone}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {result.date}
                                                </TableCell>
                                                <TableCell>
                                                    {result.items}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${result.status ===
                                                                "Completed"
                                                                ? "bg-green-100 text-green-800"
                                                                : result.status ===
                                                                    "Processing"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                    >
                                                        {result.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {result.amount}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                viewDetails(
                                                                    result.id
                                                                )
                                                            }
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                View details
                                                            </span>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                printReceipt(
                                                                    result.id
                                                                )
                                                            }
                                                        >
                                                            <Printer className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Print receipt
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing {searchResults.length} of{" "}
                                    {searchResults.length} results
                                </div>
                                <Button variant="outline" size="sm">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter Results
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </main>
            </MainDashboardContainer>
        </div>
    );
}
