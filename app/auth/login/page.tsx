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
import { Label } from '@/components/ui/label';
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

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof loginFormSchema>) => {
            const authService = new AuthService()
            return await authService.login(data)
        },
        onSuccess: (data) => {
            const { user } = data;

            if (user.role === 'admin') {
                router.push('/dashboard/admin');
            } else {
                router.push('/dashboard/staff');
            }

            toast.success('Authentication Successful', {
                description: 'You have successfully logged in.',
            });

            form.reset()
        },
        onError: () => {
            toast.error('Authentication Error', {
                description: 'Invalid email or password.',
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
                        Staff Portal
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
                                                placeholder="Enter your email"
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
