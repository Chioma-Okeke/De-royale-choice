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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, Search, FileText, Tag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";

export default function ReceiptPrinting() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [activeTab, setActiveTab] = useState("search");
    const [printType, setPrintType] = useState("both");

    // const handlePrint = async (orderId: string) => {
    //     const html = await fetchReceiptHTML(orderId);
    //     const printWindow = window.open('', '_blank');
    //     if (!printWindow) return;
      
    //     printWindow.document.write(html);
    //     printWindow.document.close();
    //     printWindow.focus();
    //   };

    // const handleDownloadPDF = async (orderId: string) => {
    //     const blob = await fetchReceiptPDF(orderId);
    //     const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
    //     const newWindow = window.open(url, '_blank');
    //     newWindow?.focus();
    //   };

    // Mock data for search results
    const mockRegistrations = [
        {
            id: "REG-1234",
            customer: "John Doe",
            phone: "080-1234-5678",
            date: "2023-04-18",
            items: [
                { name: "Shirt", quantity: 2, price: 500 },
                { name: "Trousers", quantity: 1, price: 700 },
                { name: "Jacket", quantity: 1, price: 1000 },
            ],
            status: "Registered",
            totalAmount: 2700,
        },
        {
            id: "REG-2345",
            customer: "Jane Smith",
            phone: "080-8765-4321",
            date: "2023-04-18",
            items: [
                { name: "Dress", quantity: 2, price: 800 },
                { name: "Bedsheet", quantity: 1, price: 1200 },
            ],
            status: "Processing",
            totalAmount: 2800,
        },
        {
            id: "REG-3456",
            customer: "Robert Johnson",
            phone: "080-2468-1357",
            date: "2023-04-17",
            items: [
                { name: "Window Curtain", quantity: 2, price: 1800 },
                { name: "Pillowcase", quantity: 3, price: 300 },
                { name: "Towel", quantity: 2, price: 400 },
            ],
            status: "Pending",
            totalAmount: 4900,
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

                results = mockRegistrations.filter((registration) => {
                    return (
                        registration.id.toLowerCase().includes(term) ||
                        registration.customer.toLowerCase().includes(term) ||
                        registration.phone.toLowerCase().includes(term)
                    );
                });
            }

            setSearchResults(results);
            setIsSearching(false);

            toast({
                title: `${results.length} results found`,
                description:
                    results.length > 0
                        ? "Select a registration to print its receipt."
                        : "No matching records found. Try a different search term.",
            });
        }, 800);
    };

    const selectRegistration = (registration) => {
        setSelectedRegistration(registration);
        setActiveTab("print");
    };

    const handlePrint = () => {
        toast({
            title: "Printing Receipt",
            description: `${printType === "both"
                    ? "Receipt and tags"
                    : printType === "receipt"
                        ? "Receipt"
                        : "Tags"
                } for ${selectedRegistration.id} are being sent to the printer.`,
        });

        // In a real app, this would trigger the printing functionality
    };

    const getTotalItems = (registration) => {
        return registration.items.reduce((sum, item) => sum + item.quantity, 0);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Print Receipts" role="staff" username="staff" />
                <main className="p-4 md:p-6">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="search">
                                Search Registration
                            </TabsTrigger>
                            <TabsTrigger
                                value="print"
                                disabled={!selectedRegistration}
                            >
                                Print Receipt
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="search">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Search Registration</CardTitle>
                                    <CardDescription>
                                        Find a registration to print its receipt
                                        and tags
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleSearch}
                                        className="space-y-4"
                                    >
                                        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                            <div className="flex-1">
                                                <Label htmlFor="search-term">
                                                    Search Term
                                                </Label>
                                                <div className="relative">
                                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="search-term"
                                                        placeholder="Enter registration ID, customer name, or phone"
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

                                    {searchResults.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-medium mb-4">
                                                Search Results
                                            </h3>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            Reg ID
                                                        </TableHead>
                                                        <TableHead>
                                                            Customer
                                                        </TableHead>
                                                        <TableHead className="hidden md:table-cell">
                                                            Phone
                                                        </TableHead>
                                                        <TableHead className="hidden md:table-cell">
                                                            Date
                                                        </TableHead>
                                                        <TableHead>
                                                            Items
                                                        </TableHead>
                                                        <TableHead>
                                                            Status
                                                        </TableHead>
                                                        <TableHead className="text-right">
                                                            Actions
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {searchResults.map(
                                                        (registration) => (
                                                            <TableRow
                                                                key={
                                                                    registration.id
                                                                }
                                                            >
                                                                <TableCell className="font-medium">
                                                                    {
                                                                        registration.id
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        registration.customer
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">
                                                                    {
                                                                        registration.phone
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">
                                                                    {
                                                                        registration.date
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {getTotalItems(
                                                                        registration
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <span
                                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${registration.status ===
                                                                                "Completed"
                                                                                ? "bg-green-100 text-green-800"
                                                                                : registration.status ===
                                                                                    "Processing"
                                                                                    ? "bg-blue-100 text-blue-800"
                                                                                    : "bg-yellow-100 text-yellow-800"
                                                                            }`}
                                                                    >
                                                                        {
                                                                            registration.status
                                                                        }
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            selectRegistration(
                                                                                registration
                                                                            )
                                                                        }
                                                                    >
                                                                        Select
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="print">
                            {selectedRegistration && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Print Receipt and Tags
                                        </CardTitle>
                                        <CardDescription>
                                            Review and print the receipt and
                                            tags for {selectedRegistration.id}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1">
                                                <Label
                                                    htmlFor="print-type"
                                                    className="mb-2 block"
                                                >
                                                    Print Type
                                                </Label>
                                                <div className="flex gap-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id="print-both"
                                                            name="print-type"
                                                            value="both"
                                                            checked={
                                                                printType ===
                                                                "both"
                                                            }
                                                            onChange={() =>
                                                                setPrintType(
                                                                    "both"
                                                                )
                                                            }
                                                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                                                        />
                                                        <label
                                                            htmlFor="print-both"
                                                            className="ml-2 text-sm"
                                                        >
                                                            Receipt & Tags
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id="print-receipt"
                                                            name="print-type"
                                                            value="receipt"
                                                            checked={
                                                                printType ===
                                                                "receipt"
                                                            }
                                                            onChange={() =>
                                                                setPrintType(
                                                                    "receipt"
                                                                )
                                                            }
                                                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                                                        />
                                                        <label
                                                            htmlFor="print-receipt"
                                                            className="ml-2 text-sm"
                                                        >
                                                            Receipt Only
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id="print-tags"
                                                            name="print-type"
                                                            value="tags"
                                                            checked={
                                                                printType ===
                                                                "tags"
                                                            }
                                                            onChange={() =>
                                                                setPrintType(
                                                                    "tags"
                                                                )
                                                            }
                                                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                                                        />
                                                        <label
                                                            htmlFor="print-tags"
                                                            className="ml-2 text-sm"
                                                        >
                                                            Tags Only
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <Label className="mb-2 block">
                                                    Print Preview
                                                </Label>
                                                <div className="flex gap-4">
                                                    {(printType === "both" ||
                                                        printType ===
                                                        "receipt") && (
                                                            <Button
                                                                variant="outline"
                                                                className="flex-1"
                                                            >
                                                                <FileText className="mr-2 h-4 w-4" />
                                                                Preview Receipt
                                                            </Button>
                                                        )}
                                                    {(printType === "both" ||
                                                        printType ===
                                                        "tags") && (
                                                            <Button
                                                                variant="outline"
                                                                className="flex-1"
                                                            >
                                                                <Tag className="mr-2 h-4 w-4" />
                                                                Preview Tags
                                                            </Button>
                                                        )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-6 space-y-4">
                                            <div className="text-center border-b pb-4">
                                                <h3 className="text-xl font-bold">
                                                    Laundry Receipt
                                                </h3>
                                                <p className="text-muted-foreground">
                                                    Registration ID:{" "}
                                                    {selectedRegistration.id}
                                                </p>
                                                <p className="text-muted-foreground">
                                                    Date:{" "}
                                                    {selectedRegistration.date}
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-semibold">
                                                    Customer Information
                                                </h4>
                                                <p>
                                                    Name:{" "}
                                                    {
                                                        selectedRegistration.customer
                                                    }
                                                </p>
                                                <p>
                                                    Phone:{" "}
                                                    {selectedRegistration.phone}
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-semibold">
                                                    Items
                                                </h4>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>
                                                                Description
                                                            </TableHead>
                                                            <TableHead className="text-right">
                                                                Qty
                                                            </TableHead>
                                                            <TableHead className="text-right">
                                                                Price (₦)
                                                            </TableHead>
                                                            <TableHead className="text-right">
                                                                Total (₦)
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {selectedRegistration.items.map(
                                                            (item, index) => (
                                                                <TableRow
                                                                    key={index}
                                                                >
                                                                    <TableCell>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="text-right">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="text-right">
                                                                        {item.price.toLocaleString()}
                                                                    </TableCell>
                                                                    <TableCell className="text-right">
                                                                        {(
                                                                            item.price *
                                                                            item.quantity
                                                                        ).toLocaleString()}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>

                                            <div className="border-t pt-4 flex justify-between">
                                                <span className="font-bold">
                                                    Total Amount:
                                                </span>
                                                <span className="font-bold">
                                                    ₦
                                                    {selectedRegistration.totalAmount.toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="text-center text-sm text-muted-foreground pt-4">
                                                <p>
                                                    Thank you for your business!
                                                </p>
                                                <p>
                                                    Please keep this receipt for
                                                    item collection.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {Array.from({
                                                length: getTotalItems(
                                                    selectedRegistration
                                                ),
                                            })
                                                .slice(0, 4)
                                                .map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className="border rounded-lg p-4 text-center"
                                                    >
                                                        <div className="text-xs mb-2">
                                                            Tag {index + 1} of{" "}
                                                            {getTotalItems(
                                                                selectedRegistration
                                                            )}
                                                        </div>
                                                        <div className="font-bold">
                                                            {
                                                                selectedRegistration.id
                                                            }
                                                        </div>
                                                        <div className="text-xs">
                                                            {
                                                                selectedRegistration.customer
                                                            }
                                                        </div>
                                                        <div className="text-xs">
                                                            {
                                                                selectedRegistration.date
                                                            }
                                                        </div>
                                                    </div>
                                                ))}
                                            {getTotalItems(
                                                selectedRegistration
                                            ) > 4 && (
                                                    <div className="border rounded-lg p-4 text-center flex items-center justify-center">
                                                        <span className="text-sm text-muted-foreground">
                                                            +
                                                            {getTotalItems(
                                                                selectedRegistration
                                                            ) - 4}{" "}
                                                            more tags
                                                        </span>
                                                    </div>
                                                )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setActiveTab("search")
                                            }
                                        >
                                            Back to Search
                                        </Button>
                                        <Button onClick={handlePrint}>
                                            <Printer className="mr-2 h-4 w-4" />
                                            Print{" "}
                                            {printType === "both"
                                                ? "Receipt & Tags"
                                                : printType === "receipt"
                                                    ? "Receipt"
                                                    : "Tags"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
