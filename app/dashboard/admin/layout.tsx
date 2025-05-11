import { Sidebar } from '@/components/dashboard/sidebar'
import { MediaQuery } from '@/components/shared/media-query';
import React from 'react'

function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MediaQuery breakpoint="lg" mediaQuery="min">
            <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
                <Sidebar role="admin" />
                <div className="flex-1 w-full">
                    {children}
                </div>
            </div>
        </MediaQuery>
    )
}

export default Layout