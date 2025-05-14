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
import { useQuery } from "@tanstack/react-query";
import OrderService from "@/app/services/order-service";
import { useParams } from "next/navigation";
import ReceiptPageSkeleton from "../loading";
import ReceiptService from "@/app/services/receipt-service";

export default function ReceiptPrinting() {
    const { toast } = useToast();
    const [printType, setPrintType] = useState<"customer" | "company">("customer");
    const params = useParams()
    const id = params?.id as string

    const {
        data: orderDetails,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryFn: () => new OrderService().getSingleOrder(id),
        queryKey: ['singleOrder', id],
        enabled: !!id,
    })

    console.log(orderDetails, "here are the fetched details")

    const handlePrint = async (orderId: string) => {
        console.log(printType, "print")
        const receiptService = new ReceiptService()
        const html = await receiptService.fetchReceiptHTML(orderId, printType)
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
      };

    // const handleDownloadPDF = async (orderId: string) => {
    //     const blob = await fetchReceiptPDF(orderId);
    //     const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
    //     const newWindow = window.open(url, '_blank');
    //     newWindow?.focus();
    //   };


    // const handlePrint = () => {
    //     toast({
    //         title: "Printing Receipt",
    //         description: `${printType === "both"
    //             ? "Receipt and tags"
    //             : printType === "receipt"
    //                 ? "Receipt"
    //                 : "Tags"
    //             } for ${orderDetails?._id} are being sent to the printer.`,
    //     });

    //     // In a real app, this would trigger the printing functionality
    // };

    if (isLoading) return <ReceiptPageSkeleton/>
    if (isError) return <p>Error: {(error as Error).message}</p>

    return (
        <div className="flex min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Print Receipts" />
                <main className="p-4 md:p-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Print Receipt and Tags
                            </CardTitle>
                            <CardDescription>
                                Review and print the receipt and
                                tags for {orderDetails?.receiptId}
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
                                                    "customer"
                                                }
                                                onChange={() =>
                                                    setPrintType(
                                                        "customer"
                                                    )
                                                }
                                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <label
                                                htmlFor="print-both"
                                                className="ml-2 text-sm"
                                            >
                                                Customer copy
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
                                                    "company"
                                                }
                                                onChange={() =>
                                                    setPrintType(
                                                        "company"
                                                    )
                                                }
                                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <label
                                                htmlFor="print-receipt"
                                                className="ml-2 text-sm"
                                            >
                                                Company copy
                                            </label>
                                        </div>
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
                                        {orderDetails?.receiptId}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Date:{" "}
                                        {orderDetails?.createdAt}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-semibold">
                                        Customer Information
                                    </h4>
                                    <p>
                                        Name:{" "}
                                        {
                                            orderDetails?.customerId.name
                                        }
                                    </p>
                                    <p>
                                        Phone:{" "}
                                        {orderDetails?.customerId.phoneNumber}
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
                                            {orderDetails?.laundryItems.map(
                                                (item, index) => (
                                                    <TableRow
                                                        key={item._id}
                                                    >
                                                        <TableCell>
                                                            {
                                                                item.itemName
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
                                        {orderDetails?.totalAmount.toLocaleString()}
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
                                {orderDetails &&
                                    Array.isArray(orderDetails.laundryItems) && (
                                        <>
                                            {orderDetails.laundryItems
                                                .flatMap((item) =>
                                                    Array.from({ length: item.quantity }).map(() => item)
                                                )
                                                .slice(0, 4)
                                                .map((item, index, fullList) => (
                                                    <div
                                                        key={index}
                                                        className="border rounded-lg p-4 text-center"
                                                    >
                                                        <div className="text-xs mb-2">
                                                            Tag {index + 1} of {fullList.length}
                                                        </div>
                                                        <div className="font-bold">
                                                            {orderDetails.receiptId}
                                                        </div>
                                                        <div className="text-xs">
                                                            {item.itemName}
                                                        </div>
                                                        <div className="text-xs">
                                                            {orderDetails.customerId?.name}
                                                        </div>
                                                        <div className="text-xs">
                                                            {new Date(orderDetails.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                ))}

                                            {orderDetails.laundryItems
                                                .flatMap((item) => Array(item.quantity).fill(item))
                                                .length > 4 && (
                                                    <div className="border rounded-lg p-4 text-center flex items-center justify-center">
                                                        <span className="text-sm text-muted-foreground">
                                                            +
                                                            {orderDetails.laundryItems
                                                                .flatMap((item) => Array(item.quantity).fill(item))
                                                                .length - 4}{" "}
                                                            more tags
                                                        </span>
                                                    </div>
                                                )}
                                        </>
                                    )}
                            </div>

                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {orderDetails && <Button onClick={() => handlePrint(orderDetails?._id)}>
                                <Printer className="mr-2 h-4 w-4" />
                                Print{" "}
                                {printType === "customer"
                                    ? "Customer Copy"
                                    : printType === "company"
                                        ? "Company Copy"
                                        : ""}
                            </Button>}
                        </CardFooter>
                    </Card>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
