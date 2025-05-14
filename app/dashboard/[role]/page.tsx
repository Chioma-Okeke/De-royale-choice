import AdminDashboard from "../../../components/dashboard/admin/admin-dashboard"
import StaffDashboard from "../../../components/dashboard/staff/staff-dashboard"

export default async function Page({
    params
}: Readonly<{
    params: { role: string }
}>) {
    const { role } = await params

    if (role === "admin") {
        return (
            <AdminDashboard />
        )
    } else {
        return (
            <StaffDashboard />
        )
    }
}