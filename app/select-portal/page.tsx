'use client'


import { useRouter } from '@bprogress/next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck, User } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function SelectPortalPage() {
    const router = useRouter()
    const { user } = useAuth() 

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted px-4">
            <Card className="w-full max-w-md p-6 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl text-brand-navy">
                        Choose Your Portal
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1 text-center">
                        <p className="text-muted-foreground">
                            Welcome, <span className="font-medium">Admin</span>!
                        </p>
                        <p>Select which portal you'd like to enter:</p>
                    </div>

                    <div className="grid gap-4">
                        <Button
                            variant="default"
                            className="w-full flex gap-2 items-center justify-center text-lg py-6 bg-brand-navy"
                            onClick={() => router.push('/dashboard/admin')}
                        >
                            <ShieldCheck className="w-5 h-5" />
                            Admin Portal
                        </Button>

                        <Button
                            variant="secondary"
                            className="w-full flex gap-2 items-center justify-center text-lg py-6"
                            onClick={() => router.push('/dashboard/staff')}
                        >
                            <User className="w-5 h-5" />
                            Staff Portal
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
