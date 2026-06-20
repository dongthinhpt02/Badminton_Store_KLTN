import { z } from "zod";

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const promotionSchema = z.object({
  id: z.string().uuid(),
  codePromotion: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Mã Khuyến mãi chỉ được chứa chữ cái, số và dấu cách",
  }),
  valuePromotion: z
    .number()
    .min(0, { message: "Giá trị khuyến mãi phải lớn hơn hoặc bằng 0" }),
  status: z.enum(["active", "inactive"]).default("active"),
  created_at: z.date(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  restored_at: z.date().nullable(),
});

export type Promotion = z.infer<typeof promotionSchema>;
export type PromotionForm = z.infer<typeof promotionSchema>;

export const createPromotionSchema = promotionSchema.pick({
  codePromotion: true,
  valuePromotion: true,
  status: true,
  created_at: true,
});
export type ICreatePromotionForm = z.infer<typeof createPromotionSchema>;

export const updatePromotionSchema = promotionSchema
  .pick({
    id: true,
    codePromotion: true,
    valuePromotion: true,
    status: true,
    updated_at: true,
  })
  .partial();
export type IUpdatePromotionForm = z.infer<typeof updatePromotionSchema>;
