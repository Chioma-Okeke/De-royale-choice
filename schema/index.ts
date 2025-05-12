import { z } from "zod";

export const createCategorySchema = z.object({
    name: z
        .string()
        .min(1, { message: "Category name is required." })
        .min(3, {
            message: "Category name must be at least 3 characters",
        })
        .max(50, {
            message: "Category name must be 50 characters or less.",
        })
        .regex(/^[a-zA-Z0-9\-\/_ ]*$/, {
            message:
                "Category name can only contain alphanumeric characters, slash, underscore and hyphen",
        }),
});

export const itemSchema = z.object({
    categoryId: z.string().min(1, "Category is required"),
    itemName: z.string().min(1, "Item name is required"),
    itemPrice: z.coerce.number().min(0, "Price must be at least 0"),
});

export const createCustomerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    address: z.string().optional(),
});

export const createOrderSchema = z.object({
    items: z.array(
      z.object({
        customerId: z.string(),
        category: z.string().min(1, "Category is required"),
        description: z.string().min(1, "Description is required"),
        quantity: z.number().min(1),
        price: z.number().min(0),
      })
    ),
});
