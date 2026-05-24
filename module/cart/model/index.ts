import { z } from "zod";
import { CartItem } from "../../cartitem/model";

export const cartSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  totalQuantity: z.number().min(0),
  totalPrice: z.number().min(0),
});
export type Cart = z.infer<typeof cartSchema>;
export type CartForm = z.infer<typeof cartSchema>;

export const updateCartSchema = cartSchema.pick({
  totalQuantity: true,
  totalPrice: true,
});
export type IUpdateCartForm = z.infer<typeof updateCartSchema>;

export type CartWithItems = Cart & {
  items: CartItem[];
};
