import React, { useState } from 'react'
import { ItemDialog } from './items-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ConfirmDeleteDialog } from '@/components/modals/delete-modal';
import { getCategoriesQueryOpts, getItemsQueryOpts } from '@/lib/query-options';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IGetItemsContent } from '@/types';
import ItemsService from '@/app/services/items-service';
import { toast } from 'sonner';
import { TableBodySkeleton } from '@/components/shared/table-skeleton';

function ItemsTabContent() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [mode, setMode] = useState<"create" | "edit">("create")
    const [selectedItem, setSelectedItem] = useState<IGetItemsContent | null>(null)
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient()
    const columns = 4

    const { data: categories } = useQuery(getCategoriesQueryOpts)
    const { data: items, isLoading } = useQuery(getItemsQueryOpts)

    const { mutate, isPending } = useMutation({
        mutationFn: async (item: IGetItemsContent) => {
            const itemsService = new ItemsService()
            return await itemsService.deleteItem(
                item._id
            )
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(getCategoriesQueryOpts)
            toast.success("Item Deleted", {
                description: `Item has been deleted successfully.`,
            });
        },
        onError: (error) => {
            console.error("Error deleting item:", error);
            toast.error("Item Deletion Failed", {
                description: "The item could not be deleted due to an error."
            })
        }
    })

    const handleDeleteConfirmation = (item: any) => {
        setSelectedItem(item);
        setOpen(true)
    };

    const handleDelete = (values: IGetItemsContent) => {
        mutate(values)
    }

    const openEditItemDialog = (item: IGetItemsContent) => {
        setSelectedItem(item)
        setMode("edit")
        setIsDialogOpen(true)
    }

    const openAddDialog = () => {
        setMode("create")
        setIsDialogOpen(true)
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            Laundry Items & Pricing
                        </CardTitle>
                        <CardDescription>
                            Manage the items and their prices
                        </CardDescription>
                    </div>
                    <Button
                        onClick={openAddDialog}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Item
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">
                                    Price (₦)
                                </TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableBodySkeleton
                                    rows={4}
                                    columns={columns}
                                />
                            ) : items && items.length > 0 ? items.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell className="font-medium">
                                        {item.itemName}
                                    </TableCell>
                                    <TableCell>
                                        {item.categoryName}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.itemPrice?.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    openEditItemDialog(
                                                        item
                                                    )
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </Button>
                                            <>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDeleteConfirmation(item)}>

                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Delete
                                                    </span>
                                                </Button>

                                                <ConfirmDeleteDialog
                                                    open={open}
                                                    onClose={() => {
                                                        setOpen(false);
                                                        setSelectedItem(null);
                                                    }}
                                                    onConfirm={() => {
                                                        if (selectedItem) {
                                                            handleDelete(selectedItem)
                                                        }
                                                    }
                                                    }
                                                    title={`Delete "${selectedItem?.itemName}"?`}
                                                    description="This will permanently delete the item. Are you sure?"
                                                    loading={isPending}
                                                />
                                            </>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={columns} className="text-center py-10 text-lg text-muted-foreground">
                                        No items found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <ItemDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                mode={mode}
                categories={categories || []}
                selectedItem={selectedItem}
            />

        </>
    )
}

export default ItemsTabContent