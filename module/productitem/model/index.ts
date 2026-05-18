import { z } from "zod";

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export const productItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(), // 🔑 bắt buộc (FK)
  colorId: z.string().uuid(), // 🔑 bắt buộc (FK)
  sizeId: z.string().uuid(), // 🔑 bắt buộc (FK)
  promotionId: z.string().uuid().nullable().optional(), // 🔑 bắt buộc (FK)
  nameProductItem: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Tên mặt hàng sản phẩm chỉ được chúa chữ cái, số và dấu cách",
  }),
  normalizedNameProductItem: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Tổ mặt hàng sản phẩm chỉ được chuae chữ cái, số và dấu cách",
  }),
  imageProductItem: z.array(z.string()).nullable().optional(),
  description: z.string().nullable().optional(),
  quantity: z.number().min(0).default(0),
  price: z.string(),
  pricePromotion: z.string().nullable().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  created_at: z.date(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  restored_at: z.date().nullable(),
});

export type ProductItem = z.infer<typeof productItemSchema>;
export type ProductItemForm = z.infer<typeof productItemSchema>;

export const createProductItemSchema = productItemSchema
  .pick({
    productId: true,
    sizeId: true,
    colorId: true,
    nameProductItem: true,
    imageProductItem: true,
    description: true,
    price: true,
    quantity: true,
    created_at: true,
  })
  .required();
export type ICreateProductItemForm = z.infer<typeof createProductItemSchema>;

export const updateProductItemSchema = productItemSchema
  .pick({
    id: true,
    nameProductItem: true,
    imageProductItem: true,
    description: true,
    price: true,
    status: true,
    updated_at: true,
  })
  .partial();
export type IUpdateProductItemForm = z.infer<typeof updateProductItemSchema>;
