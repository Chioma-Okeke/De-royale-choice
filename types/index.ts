import { Document } from "mongoose";

export interface IGetCustomerResponse {
    customer: IGetCustomerContent[];
    message: string;
}

export interface IGetCustomerContent {
    _id: string;
    name: string;
    phoneNumber: string;
    address: string;
    orders: string[];
}

export interface ICreateCustomer {
    name: string;
    phone: string;
    address?: string;
}

export interface ICreateOrder {
    customerId: string;
    items: {
        categoryId: string;
        itemId: string;
        quantity: number;
        price: number;
        totalPrice: number;
    }[];
    totalAmount: number;
}

export interface IGetOrders {
    registrations: {
        orderId: string
        receiptId: string;
        customer: string;
        phone: string;
        date: string;
        items: number;
        status: string;
        amount: number;
    }[];
    total: number;
}

export interface IGetSingleOrder {
    customer: IGetCustomerContent
    items: {
        itemName: string;
        itemId: string;
        quantity: number;
        itemPrice: number;
        totalPrice: number;
    }[];
    receiptId: string
    date: string
    totalAmount: number
}

export interface IGetOrdersParams {
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    limit?: number;
    offset?: number;
}

export interface IGetCategoriesResponse {
    categories: IGetCategoryContent[];
}

export interface IGetCategoryContent {
    _id: string;
    name: string;
    items: number;
}

export interface IGetSingleCategory {
    category: {
        _id: string;
        name: string;
        items: IGetSingleItem[];
    };
}

export interface Category {
    name: string;
    item: string;
    id: string;
}

export interface IGetItemsResponse {
    items: IGetItemsContent[];
}
export interface IGetItemsContent {
    _id: string;
    itemName: string;
    categoryName: string;
    itemPrice: number;
    categoryId: string;
}

export interface IGetSingleItem {
    _id: string;
    itemName: string;
    itemPrice: string;
}

export interface ICreateItemRequest {
    itemName: string;
    categoryId: string;
    itemPrice: number;
}

export interface ITypeaheadProps {
    label: string;
    value: string;
}

export interface UserAuthBody {
    email: string;
    password: string;
}

export interface IGetUser {
    user: {
        _id: string;
        email: string;
        role: "admin" | "staff";
    };
}
