'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import NotAuthorized from '@/app/not-authorized/page'
import MainDashboardContainer from '@/components/shared/main-dashboard-container'
import { Header } from '@/components/dashboard/header/header'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/app/services/auth-service'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from '@bprogress/next'

const customerSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid Email Address"),
    role: z.string().min(2, 'User role is required'),
    password: z.string().min(1, 'Password is required').min(6, 'Password cannot be less than 6 characters.'),
})

type CustomerFormValues = z.infer<typeof customerSchema>

export default function RegisterCustomerForm() {
    const pathname = usePathname()
    const { user } = useAuth()
    const router = useRouter()
    const form = useForm<CustomerFormValues>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            email: '',
            role: '',
            password: '',
        }
    })

    const { isDirty } = form.formState

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof customerSchema>) => {
            const authService = new AuthService()
            return await authService.registerUser(data)
        },
        onSuccess: () => {

            toast.success('User Creation Successful', {
                description: 'You have successfully created the user.',
            });

            form.reset()
        },
        onError: (response) => {
            toast.error('User Registration Error', {
                description: response.message,
            });
        },
    });

    const onSubmit = async (data: CustomerFormValues) => {
        mutate(data)
    }

    const navigateBack = () => {
        router.back()
    }

    if (pathname.includes(`/dashboard/admin`) && user?.role !== "admin") {
        return <NotAuthorized role={user?.role as "admin" | "staff"} />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Settings" />
                <main className="p-4 md:p-6 space-y-6">
                    <div className='flex items-center'>
                        <ChevronLeft onClick={navigateBack} className="cursor-pointer hover:scale-110 transition-all ease-in-out duration-300" />
                        <span>Back</span>
                    </div>
                    <Card className="max-w-xl mx-auto mt-8 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">Register New Customer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
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
                                                <FormLabel>User role</FormLabel>
                                                <FormControl>
                                                    <select
                                                        {...field}
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    >
                                                        <option value="">Select user role</option>
                                                        {["admin", "staff"].map((role, i) => (
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
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button isLoading={isPending} disabled={isPending || !isDirty} type="submit" className="w-full">
                                        Register Customer
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </main>
            </MainDashboardContainer>
        </div>

    )
}
