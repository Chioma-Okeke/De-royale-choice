"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import CategoriesTabContent from "@/components/dashboard/admin/inventory/categories/categories-tab-content";
import ItemsTabContent from "@/components/dashboard/admin/inventory/items/items-tab-content";

export default function InventoryManagement() {
    const [activeTab, setActiveTab] = useState("categories");

    return (
        <div className="min-h-screen bg-gray-50">
            <MainDashboardContainer className="flex-1">
                <Header
                    title="Inventory Management"
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
