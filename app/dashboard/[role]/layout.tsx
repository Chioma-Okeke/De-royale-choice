import ClientLayout from './client-layout';

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { role: string };
}) {
    const { role } = await params;

    return <ClientLayout role={role as 'admin' | 'staff' | 'limited'}>{children}</ClientLayout>;
}
