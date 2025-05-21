'use client'

import { usePathname } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useAuth } from '@/hooks/use-auth'
import NotAuthorized from '@/app/not-authorized/page'
import MainDashboardContainer from '@/components/shared/main-dashboard-container'
import { Header } from '@/components/dashboard/header/header'
import RegisterCustomerForm from '@/components/dashboard/settings/register-user-form'
import ResetPasswordForm from '@/components/dashboard/settings/reset-password-form'

export default function SettingsPage() {
    const pathname = usePathname()
    const { user } = useAuth()

    if (pathname.includes(`/dashboard/admin`) && user?.role !== "admin") {
        return <NotAuthorized role={user?.role as 'admin' | 'staff'} />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Settings" />
                <main className="p-4 md:p-6 space-y-6">

                    <Tabs defaultValue="register" className="max-w-2xl mx-auto mt-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="register">Register User</TabsTrigger>
                            <TabsTrigger value="reset">Reset Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="register">
                            <RegisterCustomerForm />
                        </TabsContent>
                        <TabsContent value="reset">
                            <ResetPasswordForm />
                        </TabsContent>
                    </Tabs>
                </main>
            </MainDashboardContainer>
        </div>
    )
}
