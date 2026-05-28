import { z } from "zod";

export enum OrderStatus {
  PROCESSING = "processing",

  DELIVERED = "delivered",

  COMPLETED = "completed",

  CANCELLED = "cancelled",
}

// =========================
// ORDER
// =========================
export const orderSchema = z.object({
  id: z.string().uuid(),

  userId: z.string().uuid(),

  fullname: z.string(),

  totalQuantity: z.number().int().nonnegative(),

  totalCart: z.number().nonnegative(),

  shippingFee: z.number().nonnegative(),

  totalCartOrder: z.number().nonnegative(),

  address: z.string(),

  phonenumber: z.string(),

  status: z.nativeEnum(OrderStatus),

  namePayment: z.string(),

  from_district_id: z.number().int().nonnegative(),

  from_ward_code: z.string(),

  to_district_id: z.number().int().nonnegative(),

  to_ward_code: z.string(),

  cod_amount: z.number().nonnegative(),

  created_at: z.date(),

  delivered_at: z.date().nullable(),

  completed_at: z.date().nullable(),
});

export type Order = z.infer<typeof orderSchema>;

export type OrderForm = z.infer<typeof orderSchema>;

export const createOrderSchema = orderSchema.pick({
  userId: true,

  fullname: true,

  totalQuantity: true,

  totalCart: true,

  shippingFee: true,

  totalCartOrder: true,

  address: true,

  phonenumber: true,

  status: true,

  namePayment: true,

  from_district_id: true,

  from_ward_code: true,

  to_district_id: true,

  to_ward_code: true,

  cod_amount: true,

  created_at: true,
});

export type ICreateOrder = z.infer<typeof createOrderSchema>;
export type ICreateOrderForm = z.infer<typeof createOrderSchema>;
// =========================
// UPDATE DELIVERED
// =========================
export const updateDeliveredOrderSchema = orderSchema.pick({
  id: true,

  status: true,

  delivered_at: true,
});

export type UpdateDeliveredOrderForm = z.infer<
  typeof updateDeliveredOrderSchema
>;

// =========================
// UPDATE COMPLETED
// =========================
export const userUpdateCompletedOrderSchema = orderSchema.pick({
  id: true,

  status: true,

  delivered_at: true,

  completed_at: true,
});

export type UserUpdateCompletedOrder = z.infer<
  typeof userUpdateCompletedOrderSchema
>;

export type UserUpdateCompletedOrderForm = z.infer<
  typeof userUpdateCompletedOrderSchema
>;

// =========================
// DATE RANGE
// =========================
export const dateRangeSchema = z.object({
  startDate: z.string().datetime(),

  endDate: z.string().datetime(),
});

export type DateRange = z.infer<typeof dateRangeSchema>;

export type DateRangeForm = z.infer<typeof dateRangeSchema>;
