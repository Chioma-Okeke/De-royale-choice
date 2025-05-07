import { ConfirmDeleteDialog } from '@/components/modals/delete-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Category } from '@/types';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import CategoryForm from './category-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategoriesQueryOpts } from '@/lib/query-options';
import { toast } from 'sonner';
import CategoryService from '@/app/services/category-service';

function CategoriesTabContent() {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const { data: categories } = useQuery(getCategoriesQueryOpts)
    const queryClient = useQueryClient()

    const handleOpenDialog = (category: any) => {
        setSelectedCategory(category);
        setOpen(true);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: async (category: Category) => {
            const categoryService = new CategoryService()
            return await categoryService.deleteCategory(
                category.id
            )
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(getCategoriesQueryOpts)
            toast.success("Category Deleted", {
                description: `Category "${response.name}" has been deleted successfully.`,
            });
        },
        onError: (response) => {
            toast.error("Category DeletionFailed", {
                description: `Category "${response.name}" could not be deleted.`
            })
        }
    })

    const handleDeleteCat = (values: Category) => {
        mutate(values)
        toast.success("Delete Confirmed", {
            description: "Category successfully deleted."
        })
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
                            {categories && categories.length > 0 && categories.map((category) => (
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
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </>
    )
}

export default CategoriesTabContent