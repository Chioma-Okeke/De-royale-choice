import CategoryService from "@/app/services/category-service";
import { queryOptions } from "@tanstack/react-query";

export const getCategoriesQueryOpts = queryOptions({
    queryFn: () => new CategoryService().getCategoryList(),
    queryKey: ['Categories']
})