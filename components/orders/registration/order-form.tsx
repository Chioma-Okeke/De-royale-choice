import React, { useEffect, useMemo } from 'react'
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
import { useQuery } from '@tanstack/react-query';
import { getCategoriesQueryOpts, getSingleCategoryOpts } from '@/lib/query-options';
import { IGetSingleCategory, IGetSingleItem } from '@/types';
import OrderFormRow from './order-form-row';
import { useFieldArray, useForm } from 'react-hook-form';

type LaundryItemFormValues = z.infer<typeof createOrderSchema>;

function OrderForm() {
    const { data: categories } = useQuery(getCategoriesQueryOpts)
    const defaultItem = { customerId: "", category: "", description: "", quantity: 1, price: 0 };

    const form = useForm<LaundryItemFormValues>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: { items: [defaultItem] },
    });

    const { fields, append, remove, update } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const totalAmount = form.watch("items").reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    const sendOrder = (data: z.infer<typeof createOrderSchema>) => {
        console.log("I ran in submission")
        console.log(data)

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
                                    <TableHead className="w-[100px] text-right">Price (₦)</TableHead>
                                    <TableHead className="w-[100px] text-right">Total (₦)</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
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
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <div className="text-lg font-semibold">
                            Total Amount: ₦{totalAmount.toLocaleString()}
                        </div>
                        <Button type="submit" icon={Save} iconSize={16}>
                            Save Registration
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default OrderForm