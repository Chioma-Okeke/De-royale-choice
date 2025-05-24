import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrderSchema } from '@/schema';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, Save, Trash2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCategoriesQueryOpts, getSingleCategoryOpts } from '@/lib/query-options';
import { ICreateOrder, IGetCustomerContent, IGetSingleCategory, IGetSingleItem } from '@/types';
import OrderFormRow from './order-form-row';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import OrderService from '@/app/services/order-service';
import { toast } from 'sonner';
import { useRouter } from '@bprogress/next';
import { useAuth } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input'

type LaundryItemFormValues = z.infer<typeof createOrderSchema>;

interface OrderFormProps {
    selectedCustomer: IGetCustomerContent | null;
    setSelectedCustomer: (customer: IGetCustomerContent | null) => void;
    role?: "admin" | "staff"
}

function OrderForm({ selectedCustomer, setSelectedCustomer, role }: OrderFormProps) {
    const { data: categories } = useQuery(getCategoriesQueryOpts)
    const router = useRouter()
    const defaultItem = { categoryId: "", piecePerItem: 1, itemId: "", itemName: "", quantity: 1, price: 0, totalPrice: 0, };
    const defaultValues = {
        items: [defaultItem],
        deposit: 0
    }

    const form = useForm<LaundryItemFormValues>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: { items: [defaultItem] },
    });

    const { reset } = form
    const { isDirty } = form.formState

    const { fields, append, remove, update } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const items = useWatch({
        control: form.control,
        name: `items`,
    });

    const totalAmount = form.watch("items").reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: ICreateOrder) => new OrderService().placeOrder(payload),
        mutationKey: ['orderCreation'],
        onSuccess: (response) => {
            toast.success("Order Creation Successfull", {
                description: "Order was successfully created."
            })
            router.push(`/dashboard/${role}/receipts/${response.order._id}`)
        },
        onError: (response) => {
            console.error(response)
            toast.error("Order Creation Failed.", {
                description: "Order could not be created. Please try again."
            })
        }
    })

    const sendOrder = (data: z.infer<typeof createOrderSchema>) => {
        if ((data.deposit ?? 0) > totalAmount) {
            form.setError("deposit", {
                type: "manual",
                message: "Deposit cannot be more than the total amount (₦" + totalAmount.toLocaleString() + ")"
            })
            return;
        }

        if (!selectedCustomer) {
            throw new Error("Customer must be selected before creating an order.");
        }

        const payload: ICreateOrder = {
            customerId: selectedCustomer?._id,
            items: data.items,
            deposit: data.deposit ?? 0,
            totalAmount
        }
        mutate(payload)


    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(sendOrder, (errors) => console.log('Form Errors:', errors))}>
                <Card>
                    <CardHeader>
                        <CardTitle>Laundry Items</CardTitle>
                        <CardDescription>Add the items to be laundered</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[180px]">Category</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="w-[100px] text-right">Quantity</TableHead>
                                    <TableHead className="w-[50px]">Pcs</TableHead>
                                    <TableHead className="w-[100px] text-right">Price (₦)</TableHead>
                                    <TableHead className="w-[100px] text-right">Total (₦)</TableHead>
                                    <TableHead className="w-[50px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fields.map((field, index) => {
                                    return (
                                        <OrderFormRow
                                            key={field.id}
                                            field={field}
                                            index={index}
                                            form={form}
                                            remove={remove}
                                            fields={fields}
                                            categories={categories}
                                        />
                                    )
                                })}
                            </TableBody>
                        </Table>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => append(defaultItem)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                        </Button>
                        <FormField
                            control={form.control}
                            name="deposit"
                            render={({ field }) => (
                                <FormItem className="mt-6 max-w-xs">
                                    <FormLabel>Deposit Amount (₦)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={items.length === 0}
                                            placeholder="Enter deposit amount"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                field.onChange(Number(value));
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <div className="text-lg font-semibold">
                            Total Amount: ₦{totalAmount.toLocaleString()}
                        </div>
                        <Button type="submit" isLoading={isPending} disabled={!isDirty || isPending} icon={Save} iconSize={16}>
                            Save Registration
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default OrderForm