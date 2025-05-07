import { z } from "zod";

export const createCategorySchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Category name is required.' })
      .min(3, {
        message: 'Category name must be at least 3 characters',
      })
      .max(50, {
        message: 'Category name must be 50 characters or less.',
      })
      .regex(/^[a-zA-Z0-9\-\/_ ]*$/, {
        message:
          'Category name can only contain alphanumeric characters, slash, underscore and hyphen',
      }),
  })