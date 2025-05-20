'use client'

import { isDirty, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from '@bprogress/next'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { AuthService } from '@/app/services/auth-service'

// ✅ Define schema with Zod
const resetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {
    const { logoutUser } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        reset
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    })

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof resetPasswordSchema>) =>
            new AuthService().resetPassword(data),
        onSuccess: (data) => {
            toast.success('Password reset successful.')
            reset()
            if (data.logout) {
                logoutUser()
            }
        },
        onError: (err: any) => {
            toast.error('Reset failed', { description: err.message })
        },
    })

    const onSubmit = (data: ResetPasswordFormData) => {
        mutation.mutate(data)
    }

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Customer Email <span className='text-sm text-red-500'>*</span>
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter customer email"
                            {...register('email')}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="newPassword" className="block text-sm font-medium">
                            New Password <span className='text-sm text-red-500'>*</span>
                        </label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            {...register('newPassword')}
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <Button type="submit" isLoading={mutation.isPending} className="w-full" disabled={!isDirty || mutation.isPending}>
                        {isSubmitting || mutation.isPending ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
