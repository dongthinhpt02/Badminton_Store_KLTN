import { z } from "zod";

export const orderDetailSchema = z.object({
  id: z.string().uuid(),

  orderId: z.string().uuid(),

  productItemId: z.string().uuid(),

  nameProductItem: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Tên chi tiết sản phẩm chỉ được chứa chữ cái, số và dấu cách",
  }),

  price: z.number().min(1),

  pricePromotion: z.number().min(0).nullable(),

  quantity: z.number().min(1),

  imageProductItem: z.string(),

  totalPriceOrderDetail: z.number(),
});

export type OrderDetail = z.infer<typeof orderDetailSchema>;

export type OrderDetailForm = z.infer<typeof orderDetailSchema>;

export const createOrderDetailSchema = orderDetailSchema
  .pick({
    orderId: true,
    productItemId: true,
    nameProductItem: true,
    price: true,
    pricePromotion: true,
    quantity: true,
    imageProductItem: true,
    totalPriceOrderDetail: true,
  })
  .required();
export type ICreateOrderDetail = z.infer<typeof createOrderDetailSchema>;
