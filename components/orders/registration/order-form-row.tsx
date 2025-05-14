'use client'

import React, { useEffect, useMemo } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IGetCategoryContent, IGetSingleCategory, IGetSingleItem } from '@/types';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { getCategoriesQueryOpts, getSingleCategoryOpts } from '@/lib/query-options';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, Save, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';


function OrderFormRow({ field, index, form, remove, categories, fields }: any) {
    const category = useWatch({
        control: form.control,
        name: `items.${index}.categoryId`,
    });
    const description = useWatch({
        control: form.control,
        name: `items.${index}.itemId`,
    });

    const queryOptions = useMemo(() => {
        return getSingleCategoryOpts(category);
    }, [category]);

    const { data } = useQuery({
        ...queryOptions,
        enabled: !!category,
    });

    const categoryItems = data ?? [];

    useEffect(() => {
        if (!description || !category) return;

        const selectedItem = categoryItems.find(
            (item: IGetSingleItem) => item._id === description
        );
        if (selectedItem?.itemPrice != null && selectedItem.itemName !== null) {
            form.setValue(
                `items.${index}.price`,
                Number(selectedItem.itemPrice)
            );
            form.setValue(
                `items.${index}.itemName`,
                selectedItem.itemName
            )
        }
    }, [description, category, categoryItems, form, index]);

    
    const quantity = useWatch({
        control: form.control,
        name: `items.${index}.quantity`,
    });
    const price = useWatch({
        control: form.control,
        name: `items.${index}.price`,
    });
    useEffect(() => {
        if (typeof price === 'number' && typeof quantity === 'number') {
            const total = price * quantity;
            form.setValue(`items.${index}.totalPrice`, total);
        }
        }, [price, quantity, form, index]);

    return (
        <TableRow key={field.id}>
            <TableCell>
                <FormField
                    control={form.control}
                    name={`items.${index}.categoryId`}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories?.map((cat: IGetCategoryContent) => (
                                        <SelectItem
                                            key={cat._id}
                                            value={cat._id}
                                        >
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            </TableCell>

            <TableCell>
                <FormField
                    control={form.control}
                    name={`items.${index}.itemId`}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={!category}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select item" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categoryItems.map(
                                        (item: IGetSingleItem) => (
                                            <SelectItem
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {item.itemName}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            </TableCell>

            <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                            const current = form.getValues(
                                `items.${index}.quantity`
                            );
                            form.setValue(
                                `items.${index}.quantity`,
                                Math.max(1, current - 1)
                            );
                        }}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                            const current = form.getValues(
                                `items.${index}.quantity`
                            );
                            form.setValue(
                                `items.${index}.quantity`,
                                current + 1
                            );
                        }}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>

            <TableCell className="text-right">
                {price?.toLocaleString()}
            </TableCell>

            <TableCell className="text-right font-medium">
                {(price * quantity).toLocaleString()}
            </TableCell>

            <TableCell>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default OrderFormRow;
