"use client";

import { useCallback, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Minus, Trash2, Printer, Save } from "lucide-react";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { Typeahead } from "@/components/shared/typeahead-input";
import LookupService from "@/app/services/lookup-services";
import CustomerService from "@/app/services/customer-services";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createCustomerSchema, createOrderSchema } from "@/schema";
import { IGetCustomerContent, ITypeaheadProps } from "@/types";
import CustomerForm from "@/components/orders/registration/customer-form";
import OrderForm from "@/components/orders/registration/order-form";

type LaundryItemFormValues = z.infer<typeof createOrderSchema>;

export default function CustomerRegistration() {
    const [activeTab, setActiveTab] = useState("customer-info");
    const [items, setItems] = useState([
        { id: 1, category: "", description: "", quantity: 1, price: 0 },
    ]);
    const [selectedCustomer, setSelectedCustomer] = useState<IGetCustomerContent | null>(null)
    const defaultItem = { category: "", description: "", quantity: 1, price: 0 };

    const form = useForm<LaundryItemFormValues>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: { items: [defaultItem] },
    });

    const totalAmount = form.watch("items").reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    const handlePrint = () => {
        toast.success(
            "Printing Receipt", {
            description: "Receipt and tags are being sent to the printer.",
        });

        // In a real app, this would trigger the printing functionality
    };

    return (
        <div className="flex min-h-screen bg-gray-50 ">
            <Sidebar role="staff" />
            <MainDashboardContainer>
                <Header
                    title="Register Customer"
                    role="staff"
                    username="staff"
                />
                <main className="p-4 md:p-6 ">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="customer-info">
                                Customer Information
                            </TabsTrigger>
                            <TabsTrigger value="print-receipt">
                                Print Receipt
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="customer-info">
                            <div className="grid gap-6">
                                <CustomerForm selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />
                                <OrderForm selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />
                            </div>
                        </TabsContent>

                        <TabsContent value="print-receipt">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Print Receipt and Tags
                                    </CardTitle>
                                    <CardDescription>
                                        Review the information and print the
                                        receipt and tags
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="border rounded-lg p-6 space-y-4">
                                        <div className="text-center border-b pb-4">
                                            <h3 className="text-xl font-bold">
                                                Laundry Receipt
                                            </h3>
                                            <p className="text-muted-foreground">
                                                Registration ID: REG-1234
                                            </p>
                                            <p className="text-muted-foreground">
                                                Date:{" "}
                                                {new Date().toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="font-semibold">
                                                Customer Information
                                            </h4>
                                            <p>Name: John Doe</p>
                                            <p>Phone: 080-1234-5678</p>
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
                                                    {items.map(
                                                        (item, index) => (
                                                            <TableRow
                                                                key={index}
                                                            >
                                                                <TableCell>
                                                                    {item.description ||
                                                                        "Item " +
                                                                        (index +
                                                                            1)}
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
                                                ₦{totalAmount.toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="text-center text-sm text-muted-foreground pt-4">
                                            <p>Thank you for your business!</p>
                                            <p>
                                                Please keep this receipt for
                                                item collection.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="border rounded-lg p-4 text-center">
                                            <div className="text-xs mb-2">
                                                Tag 1 of{" "}
                                                {items.reduce(
                                                    (sum, item) =>
                                                        sum + item.quantity,
                                                    0
                                                )}
                                            </div>
                                            <div className="font-bold">
                                                REG-1234
                                            </div>
                                            <div className="text-xs">
                                                John Doe
                                            </div>
                                            <div className="text-xs">
                                                {new Date().toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 text-center">
                                            <div className="text-xs mb-2">
                                                Tag 2 of{" "}
                                                {items.reduce(
                                                    (sum, item) =>
                                                        sum + item.quantity,
                                                    0
                                                )}
                                            </div>
                                            <div className="font-bold">
                                                REG-1234
                                            </div>
                                            <div className="text-xs">
                                                John Doe
                                            </div>
                                            <div className="text-xs">
                                                {new Date().toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 text-center">
                                            <div className="text-xs mb-2">
                                                Tag 3 of{" "}
                                                {items.reduce(
                                                    (sum, item) =>
                                                        sum + item.quantity,
                                                    0
                                                )}
                                            </div>
                                            <div className="font-bold">
                                                REG-1234
                                            </div>
                                            <div className="text-xs">
                                                John Doe
                                            </div>
                                            <div className="text-xs">
                                                {new Date().toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-4 text-center">
                                            <div className="text-xs mb-2">
                                                Tag 4 of{" "}
                                                {items.reduce(
                                                    (sum, item) =>
                                                        sum + item.quantity,
                                                    0
                                                )}
                                            </div>
                                            <div className="font-bold">
                                                REG-1234
                                            </div>
                                            <div className="text-xs">
                                                John Doe
                                            </div>
                                            <div className="text-xs">
                                                {new Date().toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setActiveTab("customer-info")
                                        }
                                    >
                                        Back to Form
                                    </Button>
                                    <Button onClick={handlePrint}>
                                        <Printer className="mr-2 h-4 w-4" />
                                        Print Receipt & Tags
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
