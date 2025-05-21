'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from '@bprogress/next';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { UserAuthBody } from '@/types';
import { loginFormSchema } from '@/schema';
import { AuthService } from '@/app/services/auth-service';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeIcon, EyeOff, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const [showPassword, setShowPassword] = useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof loginFormSchema>) => {
            const authService = new AuthService()
            return await authService.login(data)
        },
        onSuccess: (data) => {
            const { user } = data;

            if (user.role === "admin") {
                router.push("/select-portal")
            } else {
                router.push(`/dashboard/${user?.role}`);
            }

            toast.success('Authentication Successful', {
                description: 'You have successfully logged in.',
            });

            form.reset()
        },
        onError: (response) => {
            toast.error('Authentication Error', {
                description: response.message,
            });
        },
    });

    const onSubmit = (data: UserAuthBody) => {
        mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full max-w-md border-brand-navy/20 shadow-lg rounded-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center text-brand-navy">
                        Internal Portal
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email <span className="text-red-500 text-sm">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                {...field}
                                            />
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
                                type="submit"
                                className="w-full bg-brand-navy hover:bg-brand-purple text-white"
                                isLoading={isPending}
                                disabled={isPending}
                            >
                                {isPending ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
