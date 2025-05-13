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
