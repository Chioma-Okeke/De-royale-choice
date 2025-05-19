'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from '@bprogress/next'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { AuthService } from '@/app/services/auth-service'

export default function ResetPasswordForm() {
    const {user, logoutUser} = useAuth()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async ({ targetedUserId, newPassword }: { targetedUserId: string; newPassword: string }) => new AuthService().resetPassword({targetedUserId, newPassword}),
        onSuccess: (data) => {
            toast.success('Password reset successful.')
            if (data.logout) {
                logoutUser() 
            }
        },
        onError: (err: any) => {
            toast.error('Reset failed', { description: err.message })
        }
    })


    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Customer Email
                        </label>
                        <Input type="email" id="email" placeholder="Enter customer email" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="newPassword" className="block text-sm font-medium">
                            New Password
                        </label>
                        <Input type="password" id="newPassword" placeholder="Enter new password" />
                    </div>
                    <Button type="submit" className="w-full">
                        Reset Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
