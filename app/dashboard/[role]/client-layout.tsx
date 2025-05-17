'use client'

import { useAuth } from '@/hooks/use-auth';
import NotAuthorized from '@/app/not-authorized/page';
import { SidebarNav } from '@/components/dashboard/sidebar'
import { MediaQuery } from '@/components/shared/media-query';
import DashboardLoading from './loading';
import { usePathname } from 'next/navigation';
import { useRouter } from '@bprogress/next';
import { toast } from 'sonner';

export default function ClientLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: 'admin' | 'staff' | 'limited';
}) {
  const { user, isPending, isError } = useAuth();
  const pathName = usePathname()
  const router = useRouter()

  if (isPending) {
    return <DashboardLoading/>
  }

  if (isError) {
    toast.warning("User logged out", {
        description: "kindly login again."
    })
    router.push("/auth/login")
  }
  
  if (!user) {
    return <NotAuthorized />;
  }

  if (pathName.includes(`/dashboard/admin`) && user.role !== "admin") {
    return <NotAuthorized role={role as "admin"}/>
  }

  return (
    <MediaQuery breakpoint="lg" mediaQuery="min">
      <div className="flex min-h-screen bg-gray-50 overflow-hidden w-full">
        <SidebarNav role={role} />
        <div className="flex-1 w-full">{children}</div>
      </div>
    </MediaQuery>
  );
}
