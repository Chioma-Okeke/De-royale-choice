'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/app/services/auth-service'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const customerSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid Email Address'),
    role: z.string().min(2, 'User role is required'),
    password: z.string().min(1, 'Password is required').min(6, 'Password cannot be less than 6 characters.'),
})

type CustomerFormValues = z.infer<typeof customerSchema>

export default function RegisterCustomerForm() {
    const form = useForm<CustomerFormValues>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            email: '',
            role: '',
            password: '',
        },
    })
    const [showPassword, setShowPassword] = useState(false)

    const { isDirty } = form.formState

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: CustomerFormValues) => {
            const authService = new AuthService()
            return await authService.registerUser(data)
        },
        onSuccess: () => {
            toast.success('User Creation Successful', {
                description: 'You have successfully created the user.',
            })
            form.reset()
        },
        onError: (response: any) => {
            toast.error('User Registration Error', {
                description: response.message,
            })
        },
    })

    const onSubmit = async (data: CustomerFormValues) => {
        mutate(data)
    }

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Register New User</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address <span className='text-sm text-red-500'>*</span></FormLabel>
                                    <Input placeholder="Enter user email address" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User role <span className='text-sm text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            <option value="">Select user role</option>
                                            {['admin', 'staff'].map((role, i) => (
                                                <option key={i} value={role}>
                                                    {role.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password <span className="text-red-500 text-sm">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                {...field}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            isLoading={isPending}
                            disabled={isPending || !isDirty}
                            type="submit"
                            className="w-full"
                        >
                            Register User
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
