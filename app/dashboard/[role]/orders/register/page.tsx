"use client";

import { useCallback, useState } from "react";
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
            <MainDashboardContainer>
                <Header
                    title="Order Registration"
                />
                <main className="p-4 md:p-6 ">
                    <div className="grid gap-6">
                        <CustomerForm selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />
                        <OrderForm selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />
                    </div>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
