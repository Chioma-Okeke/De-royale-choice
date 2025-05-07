"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { ConfirmDeleteDialog } from "@/components/modals/delete-modal";
import { Category } from "@/types";

export default function InventoryManagement() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("categories");
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [isEditingItem, setIsEditingItem] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [open, setOpen] = useState(false);
    const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

    const handleOpenDialog = (category: any) => {
        setSelectedCategory(category);
        setOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;
        setIsDeleteInProgress(true);
        try {
            console.log("delete will happen here")
        } finally {
            setIsDeleteInProgress(false);
            setOpen(false);
        }
    };

    // Mock data for categories
    const [categories, setCategories] = useState([
        { id: "clothes", name: "Clothes", items: 4 },
        { id: "bedding", name: "Bedding", items: 3 },
        { id: "curtains", name: "Curtains", items: 2 },
        { id: "others", name: "Others", items: 3 },
    ]);

    // Mock data for items
    const [items, setItems] = useState([
        { id: 1, category: "clothes", name: "Shirt", price: 500 },
        { id: 2, category: "clothes", name: "Trousers", price: 700 },
        { id: 3, category: "clothes", name: "Dress", price: 800 },
        { id: 4, category: "clothes", name: "Jacket", price: 1000 },
        { id: 5, category: "bedding", name: "Bedsheet", price: 1200 },
        { id: 6, category: "bedding", name: "Duvet Cover", price: 1500 },
        { id: 7, category: "bedding", name: "Pillowcase", price: 300 },
        { id: 8, category: "curtains", name: "Window Curtain", price: 1800 },
        { id: 9, category: "curtains", name: "Door Curtain", price: 2000 },
        { id: 10, category: "others", name: "Towel", price: 400 },
        { id: 11, category: "others", name: "Tablecloth", price: 900 },
        { id: 12, category: "others", name: "Napkin", price: 200 },
    ]);

    const handleAddCategory = (e) => {
        e.preventDefault();
        const categoryName = e.target.categoryName.value;
        const categoryId = categoryName.toLowerCase().replace(/\s+/g, "-");

        const newCategory = {
            id: categoryId,
            name: categoryName,
            items: 0,
        };

        setCategories([...categories, newCategory]);
        setIsAddingCategory(false);

        toast({
            title: "Category Added",
            description: `Category "${categoryName}" has been added successfully.`,
        });

        e.target.reset();
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        const itemName = e.target.itemName.value;
        const itemPrice = Number.parseFloat(e.target.itemPrice.value);
        const categoryId = e.target.categoryId.value;

        const newItem = {
            id: items.length + 1,
            category: categoryId,
            name: itemName,
            price: itemPrice,
        };

        setItems([...items, newItem]);

        // Update category item count
        setCategories(
            categories.map((category) => {
                if (category.id === categoryId) {
                    return { ...category, items: category.items + 1 };
                }
                return category;
            })
        );

        setIsAddingItem(false);

        toast({
            title: "Item Added",
            description: `Item "${itemName}" has been added successfully.`,
        });

        e.target.reset();
    };

    const handleEditItem = (e) => {
        e.preventDefault();
        const itemName = e.target.itemName.value;
        const itemPrice = Number.parseFloat(e.target.itemPrice.value);
        const categoryId = e.target.categoryId.value;

        // Check if category changed
        const oldCategory = selectedItem.category;
        const newCategory = categoryId;

        // Update the item
        setItems(
            items.map((item) => {
                if (item.id === selectedItem.id) {
                    return {
                        ...item,
                        name: itemName,
                        price: itemPrice,
                        category: categoryId,
                    };
                }
                return item;
            })
        );

        // Update category item counts if category changed
        if (oldCategory !== newCategory) {
            setCategories(
                categories.map((category) => {
                    if (category.id === oldCategory) {
                        return { ...category, items: category.items - 1 };
                    }
                    if (category.id === newCategory) {
                        return { ...category, items: category.items + 1 };
                    }
                    return category;
                })
            );
        }

        setIsEditingItem(false);
        setSelectedItem(null);

        toast({
            title: "Item Updated",
            description: `Item "${itemName}" has been updated successfully.`,
        });
    };

    const openEditItemDialog = (item) => {
        setSelectedItem(item);
        setIsEditingItem(true);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar role="admin" />
            <MainDashboardContainer className="flex-1">
                <Header
                    title="Inventory Management"
                    role="admin"
                    username="admin"
                />
                <main className="p-4 md:p-6 space-y-6">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="categories">
                                Categories
                            </TabsTrigger>
                            <TabsTrigger value="items">
                                Items & Pricing
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="categories">
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
                                    <Button
                                        onClick={() =>
                                            setIsAddingCategory(true)
                                        }
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Category
                                    </Button>
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
                                            {categories.map((category) => (
                                                <TableRow key={category.id}>
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
                                                            onConfirm={handleDelete}
                                                            title={`Delete "${selectedCategory?.name}"?`}
                                                            description="This will permanently delete the category and all items in it."
                                                            loading={isDeleteInProgress}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Dialog
                                open={isAddingCategory}
                                onOpenChange={setIsAddingCategory}
                            >
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
                                    <form onSubmit={handleAddCategory}>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="categoryName">
                                                    Category Name
                                                </Label>
                                                <Input
                                                    id="categoryName"
                                                    name="categoryName"
                                                    placeholder="Enter category name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setIsAddingCategory(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit">
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Category
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </TabsContent>

                        <TabsContent value="items">
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
                                        onClick={() => setIsAddingItem(true)}
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
                                            {items.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {categories.find(
                                                            (c) =>
                                                                c.id ===
                                                                item.category
                                                        )?.name ||
                                                            item.category}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {item.price.toLocaleString()}
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
                                                                    onClick={() => handleOpenDialog(item)}>

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
                                                                    onConfirm={handleDelete}
                                                                    title={`Delete "${selectedCategory?.name}"?`}
                                                                    description="This will permanently delete the item. Are you sure?"
                                                                    loading={isDeleteInProgress}
                                                                />
                                                            </>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Dialog
                                open={isAddingItem}
                                onOpenChange={setIsAddingItem}
                            >
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Item</DialogTitle>
                                        <DialogDescription>
                                            Create a new laundry item with
                                            pricing
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddItem}>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="categoryId">
                                                    Category
                                                </Label>
                                                <select
                                                    id="categoryId"
                                                    name="categoryId"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    required
                                                >
                                                    <option value="">
                                                        Select a category
                                                    </option>
                                                    {categories.map(
                                                        (category) => (
                                                            <option
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="itemName">
                                                    Item Name
                                                </Label>
                                                <Input
                                                    id="itemName"
                                                    name="itemName"
                                                    placeholder="Enter item name"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="itemPrice">
                                                    Price (₦)
                                                </Label>
                                                <Input
                                                    id="itemPrice"
                                                    name="itemPrice"
                                                    type="number"
                                                    min="0"
                                                    step="50"
                                                    placeholder="Enter price"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setIsAddingItem(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit">
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Item
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Dialog
                                open={isEditingItem}
                                onOpenChange={setIsEditingItem}
                            >
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Item</DialogTitle>
                                        <DialogDescription>
                                            Update the item details and pricing
                                        </DialogDescription>
                                    </DialogHeader>
                                    {selectedItem && (
                                        <form onSubmit={handleEditItem}>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="categoryId">
                                                        Category
                                                    </Label>
                                                    <select
                                                        id="categoryId"
                                                        name="categoryId"
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        defaultValue={
                                                            selectedItem.category
                                                        }
                                                        required
                                                    >
                                                        {categories.map(
                                                            (category) => (
                                                                <option
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    value={
                                                                        category.id
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="itemName">
                                                        Item Name
                                                    </Label>
                                                    <Input
                                                        id="itemName"
                                                        name="itemName"
                                                        placeholder="Enter item name"
                                                        defaultValue={
                                                            selectedItem.name
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="itemPrice">
                                                        Price (₦)
                                                    </Label>
                                                    <Input
                                                        id="itemPrice"
                                                        name="itemPrice"
                                                        type="number"
                                                        min="0"
                                                        step="50"
                                                        placeholder="Enter price"
                                                        defaultValue={
                                                            selectedItem.price
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsEditingItem(false)
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit">
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Update Item
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </TabsContent>
                    </Tabs>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
