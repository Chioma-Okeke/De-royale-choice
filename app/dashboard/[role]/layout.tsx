import ClientLayout from './client-layout';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { role: string };
}) {
  const role = params.role as 'admin' | 'staff' | 'limited';

  return <ClientLayout role={role}>{children}</ClientLayout>;
}
