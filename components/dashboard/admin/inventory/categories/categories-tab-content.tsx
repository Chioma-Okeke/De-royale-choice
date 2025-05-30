import { ConfirmDeleteDialog } from '@/components/modals/delete-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IGetCategoryContent } from '@/types';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import CategoryForm from './category-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategoriesQueryOpts } from '@/lib/query-options';
import { toast } from 'sonner';
import CategoryService from '@/app/services/category-service';
import { TableBodySkeleton } from '@/components/shared/table-skeleton';

function CategoriesTabContent() {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<IGetCategoryContent | null>(null);

    const { data: categories, isLoading } = useQuery(getCategoriesQueryOpts)
    const queryClient = useQueryClient()

    const handleOpenDialog = (category: any) => {
        setSelectedCategory(category);
        setOpen(true);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: async (category: IGetCategoryContent) => {
            const categoryService = new CategoryService()
            return await categoryService.deleteCategory(
                category._id
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries(getCategoriesQueryOpts)
            setOpen(false);
            toast.success("Category Deleted", {
                description: `Category has been deleted successfully.`,
            });
        },
        onError: () => {
            toast.error("Category Deletion Failed", {
                description: `Category could not be deleted. Please try again.`
            })
        }
    })

    const handleDeleteCat = (values: IGetCategoryContent) => {
        mutate(values)
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            Laundry Categories
                        </CardTitle>
                        <CardDescription>
                            Manage the categories of laundry
                            items
                        </CardDescription>
                    </div>
                    <CategoryForm />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Category Name
                                </TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableBodySkeleton
                                    rows={4}
                                    columns={3}
                                />
                            ) : categories && categories.length > 0 ? (
                                categories?.map((category) => (
                                    <TableRow key={category._id}>
                                        <TableCell className="font-medium">
                                            {category.name}
                                        </TableCell>
                                        <TableCell>
                                            {category.items}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleOpenDialog(category)}>

                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Delete
                                                </span>
                                            </Button>

                                            <ConfirmDeleteDialog
                                                open={open}
                                                onClose={() => {
                                                    setOpen(false);
                                                    setSelectedCategory(null);
                                                }}
                                                onConfirm={() => {
                                                    if (selectedCategory) {
                                                        handleDeleteCat(selectedCategory);
                                                    }
                                                }}
                                                title={`Delete "${selectedCategory?.name}"?`}
                                                description="This will permanently delete the category and all items in it."
                                                loading={isPending}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-10 text-lg text-muted-foreground">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </>
    )
}

export default CategoriesTabContent