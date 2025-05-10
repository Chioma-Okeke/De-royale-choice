import CategoryService from "@/app/services/category-service";
import ItemsService from "@/app/services/items-service";
import { queryOptions } from "@tanstack/react-query";

export const getCategoriesQueryOpts = queryOptions({
    queryFn: () => new CategoryService().getCategoryList(),
    queryKey: ['Categories']
})

export const getItemsQueryOpts = queryOptions({
    queryFn: () => new ItemsService().getItemsList(),
    queryKey: ['iItems']
})