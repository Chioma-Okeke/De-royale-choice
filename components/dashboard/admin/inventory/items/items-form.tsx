import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Save } from "lucide-react";
import { itemSchema } from "@/schema";
import { ICreateItemRequest, IGetCategoryContent, IGetItemsContent, IGetItemsResponse } from "@/types";
import CategoryForm from "../categories/category-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ItemsService from "@/app/services/items-service";
import { getItemsQueryOpts } from "@/lib/query-options";
import { toast } from "sonner";
import { useEffect } from "react";


type ItemFormValues = z.infer<typeof itemSchema>;

interface ItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // onSubmit: (data: ItemFormValues) => void;
  mode: "create" | "edit";
  categories: IGetCategoryContent[];
  selectedItem: IGetItemsContent | null;
}

export function ItemDialog({
  open,
  onOpenChange,
  // onSubmit,
  mode,
  categories,
  selectedItem,
}: ItemDialogProps) {
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    values: {
      categoryId: selectedItem?.categoryId ?? "",
      itemName: selectedItem?.itemName ?? "",
      itemPrice: selectedItem?.itemPrice ?? 0,
    },
  });

  const { isDirty } = form.formState
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: z.infer<typeof itemSchema>) => {
      const itemsService = new ItemsService();

      if (mode === "create") {
        return itemsService.createItem(data);
      }

      if (!selectedItem || !selectedItem._id) {
        throw new Error("Missing item ID for update.");
      }

      return itemsService.updateItem(data, selectedItem._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getItemsQueryOpts);

      toast.success(
        mode === "create" ? "Item Created" : "Item Updated",
        {
          description: `Item has been ${mode === "create" ? "added" : "updated"
            } successfully.`,
        }
      );

      onOpenChange(false)
      form.reset()
    },
    onError: () => {
      toast.error(
        mode === "create" ? "Item Creation Failed" : "Item Update Failed",
        {
          description: `Error while ${mode === "create" ? "adding" : "updating"
            } Item.`,
        }
      )
    }
  });

  const onSubmit = (values: ICreateItemRequest) => {
    mutate(values)
  }

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value)
    console.log(selectedItem, "selected item")
    if (!value) {
      form.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add New Item" : "Edit Item"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new laundry item with pricing"
              : "Update the item details and pricing"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    {categories && categories.length > 0 ? (
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">No categories found</p>
                        <CategoryForm />
                      </div>
                    )}

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="itemPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (₦)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} step={50} placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                onOpenChange(false)
                form.reset()
              }}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isPending} disabled={!isDirty || isPending} icon={Save} iconSize={16}>
                {mode === "create" ? "Save Item" : "Update Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
