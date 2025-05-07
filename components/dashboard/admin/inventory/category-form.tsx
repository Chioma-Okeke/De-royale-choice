import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createCategorySchema } from '@/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Save } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCategoriesQueryOpts } from '@/lib/query-options'
import CategoryService from '@/app/services/category-service'
import { toast } from 'sonner'

type TCreateCategorySchema = z.infer<typeof createCategorySchema>

function CategoryForm() {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const form = useForm<TCreateCategorySchema>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: '',
        },
    })

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (data: z.infer<typeof createCategorySchema>) => {
            const projectInitialization = new CategoryService()
            return await projectInitialization.createCategory(
                data
            )
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(getCategoriesQueryOpts)
            toast.success("Category Created", {
                description: `Category "${response.name}" has been added successfully.`,
            });
        },
    })

    const handleSubmit = (values: TCreateCategorySchema) => {
        mutate(values)
    }


    const { isDirty } = form.formState

    return (

        <Dialog
            open={open}
            onOpenChange={(open) => {
                setOpen(open)
            }}
        >
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add New Category
                    </DialogTitle>
                    <DialogDescription>
                        Create a new category for laundry
                        items
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='flex flex-col gap-6'
                    >
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col gap-4">
                                    <FormLabel>
                                        Category Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter Category Name"
                                            className="rounded-[8px] border border-[#C0C0C1] bg-transparent px-[14px] py-[10px] text-[16px] placeholder:text-[#667085] focus:outline-none lg:w-[450px]"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex w-full flex-col gap-1">
                            {error && (
                                <span className="mb-1 text-sm text-error-600">
                                    {error.message || 'Error while creating category.'}
                                </span>
                            )}
                            <div className='flex items-center gap-4'>
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={!isDirty}
                                    isLoading={isPending}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {isPending ? 'Saving' : 'Save'} Category
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryForm