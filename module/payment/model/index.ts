import { z } from "zod";

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export const paymentSchema = z.object({
  id: z.string().uuid(),
  namePayment: z
    .string()
    .min(2)
    .regex(/^[\p{L}0-9 ]+$/u, {
      message: "Payment name must not contain special characters",
    }),
  status: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  restored_at: z.date().nullable(),
});
export type Payment = z.infer<typeof paymentSchema>;
export type PaymentForm = z.infer<typeof paymentSchema>;

export const createPaymentSchema = paymentSchema.pick({
  namePayment: true,
  created_at: true,
  status: true,
});
export type ICreatePayment = z.infer<typeof createPaymentSchema>;
export type ICreatePaymentForm = z.infer<typeof createPaymentSchema>;

export const updatePaymentSchema = paymentSchema.pick({
  namePayment: true,
  updated_at: true,
});
export type IUpdatePayment = z.infer<typeof updatePaymentSchema>;
export type IUpdatePaymentForm = z.infer<typeof updatePaymentSchema>;
