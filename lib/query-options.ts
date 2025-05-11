import CategoryService from "@/app/services/category-service";
import ContactService from "@/app/services/contact-service";
import ItemsService from "@/app/services/items-service";
import { queryOptions } from "@tanstack/react-query";

export const getCategoriesQueryOpts = queryOptions({
    queryFn: () => new CategoryService().getCategoryList(),
    queryKey: ['Categories'],
    staleTime: 0
})

export const getItemsQueryOpts = queryOptions({
    queryFn: () => new ItemsService().getItemsList(),
    queryKey: ['Items'],
    staleTime: 0
})

export const getContactQueryOpts = queryOptions({
    queryFn: () => new ContactService().getContacts(),
    queryKey: ["Contacts"],
    staleTime: 0
})

export const getUnreadInquiriesQueryOpts  = queryOptions({
    queryFn: () => new ContactService().getUnreadInquiries(),
    queryKey: ["UnreadInquiries"],
    staleTime: 30_000,
    refetchInterval: 60_000,
})
