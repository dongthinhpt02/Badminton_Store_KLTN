import { ObjectId } from "mongodb";
import { z } from "zod";

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const productSchema = z.object({
  id: z.string().uuid(),
  brandId: z.string().uuid(),
  cateId: z.string().uuid(),
  sizeTypeId: z.string().uuid(),
  nameProduct: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Tên Sản phẩm chỉ được chúa chữ cái, số và dấu cách",
  }),
  imageProduct: z.string().url().nullable().optional(),
  description: z.string().nullable().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  created_at: z.date(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  restored_at: z.date().nullable(),
});
export type Product = z.infer<typeof productSchema>;
export type ProductForm = z.infer<typeof productSchema>;

export const createProductSchema = productSchema.pick({
  brandId: true,
  cateId: true,
  sizeTypeId: true,
  nameProduct: true,
  imageProduct: true,
  description: true,
});
export type ICreateProductForm = z.infer<typeof createProductSchema>;

export const updateProductSchema = productSchema
  .pick({
    id: true,
    nameProduct: true,
    imageProduct: true,
    description: true,
    status: true,
    updated_at: true,
  })
  .partial();
export type IUpdateProductForm = z.infer<typeof updateProductSchema>;
