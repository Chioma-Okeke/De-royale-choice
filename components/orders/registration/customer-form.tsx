'use client'

import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createCustomerSchema } from '@/schema'
import { IGetCustomerContent } from '@/types'

import CustomerService from '@/app/services/customer-services'
import LookupService from '@/app/services/lookup-services'

import { Option, Typeahead } from '@/components/shared/typeahead-input'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'

type CustomerFormValues = z.infer<typeof createCustomerSchema>

interface OrderFormProps {
  selectedCustomer: IGetCustomerContent | null
  setSelectedCustomer: (customer: IGetCustomerContent | null) => void
}

function CustomerForm({ selectedCustomer, setSelectedCustomer }: OrderFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
    },
  })

  const { setValue, handleSubmit, control, reset } = form

  const getCustomerList = useCallback(async (term: string) => {
    const lookupService = new LookupService()
    const response = await lookupService.getCustomerList(term)

    return response.map((customer: IGetCustomerContent) => ({
      label: `${customer.name} (${customer.phoneNumber})`,
      value: customer._id,
      raw: customer,
    }))
  }, [])

  const handleCustomerSelect = (selected: Option) => {
    const customer = selected.raw
    console.log("Selected customer:", customer)

    setSelectedCustomer(customer)

    // Populate the form
    setValue('name', customer.name || '')
    setValue('phone', customer.phoneNumber || '')
    setValue('address', customer.address || '')
  }

  const registerCustomer = async (data: CustomerFormValues) => {
    try {
      const service = new CustomerService()
      const newCustomer = await service.registerCustomer(data)

      console.log("newly created customer", newCustomer)

      setSelectedCustomer(newCustomer.customer)
      toast.success('Customer Created', {
        description: 'Customer has been successfully created.',
      })
    } catch (error) {
      toast.error('Customer Creation Failed', {
        description: 'There was an error when creating customer. Please try again.',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
        <CardDescription>Enter the customer's personal information</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(registerCustomer)} className="space-y-4">
            <div>
              <FormLabel>Search Customer</FormLabel>
              <Typeahead
                placeholder="Search for a customer either by number or name"
                onSearch={getCustomerList}
                onSelect={handleCustomerSelect}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={control}
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
                control={control}
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
              control={control}
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

            {!selectedCustomer && (
              <Button type="submit">
                Register Customer
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CustomerForm
