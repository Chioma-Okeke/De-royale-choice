import { AuthService } from "@/app/services/auth-service";
import CategoryService from "@/app/services/category-service";
import ContactService from "@/app/services/contact-service";
import ItemsService from "@/app/services/items-service";
import OrderService from "@/app/services/order-service";
import { IGetOrdersParams, IPaginationParams } from "@/types";
import { queryOptions } from "@tanstack/react-query";

export const getCategoriesQueryOpts = queryOptions({
    queryFn: () => new CategoryService().getCategoryList(),
    queryKey: ['Categories'],
    staleTime: 0
})

export function getSingleCategoryOpts(categoryId: string) {
    return queryOptions({
      queryFn: () =>
        new CategoryService().getSingleCategoryItem(categoryId),
      queryKey: ['category', categoryId],
      enabled: !!categoryId,
    })
  }

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

export const getUserQueryOpts = queryOptions({
  queryFn: () => new AuthService().checkAuth(),
  queryKey: ['user'],
})

export function getOrdersQueryOpts(params: IGetOrdersParams, enabled?: boolean) {
  return queryOptions({
    queryFn: () => new OrderService().getOrders(params),
    queryKey: ['orders', params], 
    staleTime: 0,
    enabled: enabled !== false
  })
}

export function getItemsQueryOpts (params?: IPaginationParams) {
  return queryOptions({
    queryFn: () => new ItemsService().getItemsList(params),
    queryKey: ['Items', params],
    staleTime: 0
})
}
