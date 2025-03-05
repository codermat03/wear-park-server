// product.validation.ts
import { z } from "zod";

const CreateProductValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Product name is required"),
        base: z.string().min(1, "Base collection is required"),
        price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
        rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
        image: z.string().url("Image URL must be valid"),
        isOnSale: z.boolean(),
        category: z.string().min(1, "Category is required"),
        description: z.string().min(10, "Description should be at least 10 characters"),
    })
});

const UpdateProductValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Product name is required").optional(),
        base: z.string().min(1, "Base collection is required").optional(),
        price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number").optional(),
        rating: z.number().min(0).max(5, "Rating must be between 0 and 5").optional(),
        image: z.string().url("Image URL must be valid").optional(),
        isOnSale: z.boolean().optional(),
        category: z.string().min(1, "Category is required").optional(),
        description: z.string().min(10, "Description should be at least 10 characters").optional(),
    })
});

export const ProductValidations = {
    CreateProductValidationSchema,
    UpdateProductValidationSchema
};
