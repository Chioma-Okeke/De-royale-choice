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
    phone?: string;
    address?: string;
}

export interface ICreateOrder {
    customerId: string;
    items: {
        categoryId: string;
        itemId: string;
        itemName: string;
        quantity: number;
        price: number;
        totalPrice: number;
        piecePerItem: number;
    }[];
    totalAmount: number;
    deposit: number
}

export interface IGetOrders {
    registrations: IGetOrdersContent[];
    total: number;
}

export interface IGetOrdersContent {
        orderId: string
        receiptId: string;
        customer: string;
        phone: string;
        date: string;
        items: number;
        status: string;
        amount: number;
        deposit: number;
        balance: number;
    }

export interface ICreateOrderResponse {
    message: string
    order: {
        customerId: string
        laundryItems: string[]
        receiptId: string
        totalAmount: number
        _id: string
    }
    success: boolean
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

export interface ISingleOrderResponse {
    _id: string;
    customerId: {
      _id: string;
      name: string;
      phoneNumber: string;
      email: string;
      address: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    laundryItems: {
      _id: string;
      orderId: string;
      itemName: string;
      quantity: number;
      categoryId: string;
      price: number;
      totalPrice: number;
      piecePerItem: number;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }[];
    totalAmount: number;
    deposit: number;
    status: string;
    receiptId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

export interface IGetOrdersParams extends IPaginationParams {
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
}
export interface IPaginationParams {
    limit?: number;
    offset?: number;
    sortBy?: string
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
    total: number
}
export interface IGetItemsContent {
    _id: string;
    itemName: string;
    categoryName: string;
    itemPrice: number;
    piecePerItem: number;
    categoryId: string;
}

export interface IGetSingleItem {
    _id: string;
    itemName: string;
    itemPrice: string;
    piecePerItem: string;
}

export interface ICreateItemRequest {
    itemName: string;
    categoryId: string;
    itemPrice: number;
    piecePerItem: number
}

export interface ITypeaheadProps {
    label: string;
    value: string;
}

export interface UserAuthBody {
    email: string;
    password: string;
}

export interface IcreateUser {
    email: string;
    password: string;
    role: string
}

export interface IGetUser {
    user: {
        _id: string;
        email: string;
        role: "admin" | "staff";
    };
}  export interface IGetUsers {
    users: {
        _id: string;
        email: string;
        role: "admin" | "staff";
    }[]
}

export interface IGetBusinessStats {
    stats: {
      customersCount: number
      ordersCount: number
      totalRevenue: number
      totalItemsProcessed: number
    }
}

export interface IGetDailyStats {
    title: string
    subtitle: string
    stats: IDailyStats[]
}

export interface IDailyStats {
    label: string
    value: number
    currency: string
}

export interface IPasswordResetData {
    email: string
    newPassword: string
}

export interface IPasswordResetResponse{
    message: string
    logout: boolean
}
