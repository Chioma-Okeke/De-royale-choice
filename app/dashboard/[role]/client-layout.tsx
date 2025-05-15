'use client'

import { useAuth } from '@/hooks/use-auth';
import NotAuthorized from '@/app/not-authorized/page';
import { Sidebar } from '@/components/dashboard/sidebar'
import { MediaQuery } from '@/components/shared/media-query';
import DashboardLoading from './loading';

export default function ClientLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: 'admin' | 'staff' | 'limited';
}) {
  const { user, isPending } = useAuth();

  if (isPending) {
    return <DashboardLoading/>
  }
  
  if (!user) {
    return <NotAuthorized />;
  }

  return (
    <MediaQuery breakpoint="lg" mediaQuery="min">
      <div className="flex min-h-screen bg-gray-50 overflow-hidden w-full">
        <Sidebar role={role} />
        <div className="flex-1 w-full">{children}</div>
      </div>
    </MediaQuery>
  );
}
