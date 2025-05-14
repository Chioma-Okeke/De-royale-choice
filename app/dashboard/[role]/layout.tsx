import { Sidebar } from '@/components/dashboard/sidebar'
import { MediaQuery } from '@/components/shared/media-query';
import React from 'react'

async function Layout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { role: string }
}>) {
    const { role } = await params
    console.log(role, "in layout")
    return (
        <MediaQuery breakpoint="lg" mediaQuery="min">
            <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
                <Sidebar role={role as 'admin' | 'staff' | 'limited'} />
                <div className="flex-1 w-full">
                    {children}
                </div>
            </div>
        </MediaQuery>
    )
}

export default Layout