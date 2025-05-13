'use client'

import CustomerService from '@/app/services/customer-services';
import LookupService from '@/app/services/lookup-services';
import { Typeahead } from '@/components/shared/typeahead-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createCustomerSchema } from '@/schema';
import { IGetCustomerContent, ITypeaheadProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type CustomerFormValues = z.infer<typeof createCustomerSchema>;

interface OrderFormProps {
    selectedCustomer: IGetCustomerContent | null;
    setSelectedCustomer: (customer: IGetCustomerContent | null) => void;
}

function CustomerForm({selectedCustomer, setSelectedCustomer}: OrderFormProps) {
    const [isRegistering, setIsRegistering] = useState(false)

    const customerCreationForm = useForm<CustomerFormValues>({
        resolver: zodResolver(createCustomerSchema),
        defaultValues: {
            name: '',
            phone: '',
            address: '',
        },
    });

    const getCustomerList = useCallback(
        async (term: string) => {
            const lookupService = new LookupService();
            const response = await lookupService.getCustomerList(term)
            console.log(response, "server response")
            return response.map((c: IGetCustomerContent) => ({
                label: `${c.name} (${c.phoneNumber})`,
                value: c._id,
            } as ITypeaheadProps))
        }, [])

    const registerCustomer = async (data: z.infer<typeof createCustomerSchema>) => {
        setIsRegistering(true)
        try {
            console.log(data)
            const customerService = new CustomerService()
            const res = await customerService.registerCustomer(data)
            console.log(res, "response")
            setSelectedCustomer(res)
            toast.success("Customer Created", {
                description: "Customer has been successfully created."
            })
        } catch (error) {
            toast.error("Customer Creation Failed", {
                description: "There was an error when creating customer. Please try again."
            })
        } finally {
            setIsRegistering(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customer Details</CardTitle>
                <CardDescription>Enter the customer's personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...customerCreationForm}>
                    <form
                        onSubmit={customerCreationForm.handleSubmit(registerCustomer)}
                        className="space-y-4"
                    >
                        <div>
                            <FormLabel>Search Customer</FormLabel>
                            <Typeahead
                                placeholder="Search for a customer either by number or name"
                                onSearch={getCustomerList}
                                onSelect={(customer) => {
                                    // Update form with selected customer
                                    customerCreationForm.setValue('name', customer.label);
                                    // form.setValue('customerId', customer.value);
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={customerCreationForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Customer Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={customerCreationForm.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={customerCreationForm.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter customer address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" isLoading={isRegistering}>
                            Register User
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default CustomerForm