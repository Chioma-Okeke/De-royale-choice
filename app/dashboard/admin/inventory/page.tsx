"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header/header";
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
import CategoriesTabContent from "@/components/dashboard/admin/inventory/categories/categories-tab-content";
import ItemsTabContent from "@/components/dashboard/admin/inventory/items/items-tab-content";

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
        <div className="min-h-screen bg-gray-50">
            {/* <Sidebar role="admin" /> */}
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
                            <CategoriesTabContent />
                        </TabsContent>

                        <TabsContent value="items">
                            <ItemsTabContent />
                        </TabsContent>
                    </Tabs>
                </main>
            </MainDashboardContainer>
        </div>
    );
}
