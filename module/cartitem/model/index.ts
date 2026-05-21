import { ObjectId } from "mongodb";
import { z } from "zod";

export enum Status {
  TICK = "tick",
  UNTICK = "untick",
}

export const cartItemSchema = z.object({
  id: z.string().uuid(),
  cartId: z.string().uuid(),
  productItemId: z.string().uuid(),
  // sessionId: z.string().uuid(),
  nameProductItem: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Tên chi tiết sản phẩm chỉ được chứa chữ cái, số và dấu cách",
  }),
  status: z.enum(["tick", "untick"]).default("untick"),
  price: z.number().min(1),
  pricePromotion: z.number().min(0).nullable().optional(),
  quantity: z.number().min(1),
  imageProductItem: z.string(),
  totalPriceCartItem: z.number(),
});
export type CartItem = z.infer<typeof cartItemSchema>;

export const updateCartItemSchema = cartItemSchema
  .pick({
    quantity: true,
  })
  .required();
export const UpdateStatusCartItem = cartItemSchema
  .pick({
    status: true,
  })
  .required();
export type UpdateStatusCartItemForm = z.infer<typeof UpdateStatusCartItem>;

export type IUpdateCartItem = z.infer<typeof updateCartItemSchema>;
export type IUpdateCartItemForm = z.infer<typeof updateCartItemSchema>;

export const createCartItemSchema = cartItemSchema
  .pick({
    cartId: true,
    productItemId: true,
    nameProductItem: true,
    price: true,
    pricePromotion: true,
    quantity: true,
    imageProductItem: true,
  })
  .required();

export type ICreateCartItem = z.infer<typeof createCartItemSchema>;
export type ICreateCartItemForm = z.infer<typeof createCartItemSchema>;
