'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import NotAuthorized from '@/app/not-authorized/page'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { TableBodySkeleton } from '@/components/shared/table-skeleton'
import MainDashboardContainer from '@/components/shared/main-dashboard-container'
import { Header } from '@/components/dashboard/header/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfirmDeleteDialog } from '@/components/modals/delete-modal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserService } from '@/app/services/users-service'

type User = {
    _id: string
    name: string
    email: string
    role: 'admin' | 'staff'
}

export default function UsersPage() {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const queryClient = useQueryClient()

    const { data: users, isLoading } = useQuery({
        queryKey: ["usersList"],
        queryFn: () => new UserService().getUsers(),
        staleTime: 1000 * 60 * 5,
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async (user: User) => {
            const userService = new UserService()
            return await userService.deleteUser(
                user._id
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["usersList"] })
            setOpen(false);
            toast.success("User Deleted", {
                description: `User has been deleted successfully.`,
            });
        },
        onError: () => {
            toast.error("User Deletion Failed", {
                description: `User could not be deleted. Please try again.`
            })
        }
    })

    const handleUserDelete = async (user: User) => {
        mutate(user)
    }

    const handleDelete = (user: any) => {
        setSelectedUser(user);
        setOpen(true);
    };

    if (user?.role !== 'admin') {
        return <NotAuthorized role={user?.role || 'staff'} />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <MainDashboardContainer>
                <Header title="Users" />
                <main className="p-4 md:p-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Active Users</CardTitle>
                            <CardDescription>View all active users </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4 overflow-x-auto w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableBodySkeleton rows={4} columns={3} />
                                    ) : users && users?.length > 0 ? users.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell className="capitalize">{user.role}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(user)}
                                                >
                                                    Delete
                                                </Button>
                                                <ConfirmDeleteDialog
                                                    open={open}
                                                    onClose={() => {
                                                        setOpen(false);
                                                        setSelectedUser(null);
                                                    }}
                                                    onConfirm={() => {
                                                        if (selectedUser) {
                                                            handleUserDelete(selectedUser);
                                                        }
                                                    }}
                                                    title={`Delete "${selectedUser?.email}"?`}
                                                    description="This will permanently delete this user."
                                                    loading={isPending}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-10 text-lg text-muted-foreground">
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                </main>
            </MainDashboardContainer>
        </div >
    )
}
