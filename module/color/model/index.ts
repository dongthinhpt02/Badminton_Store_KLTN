import { ObjectId } from "mongodb";
import { z } from "zod";

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const colorSchema = z.object({
  id: z.string().uuid(),
  nameColor: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Tên Loại Size chỉ được chứa chữ cái, số và dấu cách",
  }),
  description: z.string().nullable().optional(),
  created_at: z.date(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  restored_at: z.date().nullable(),
  status: z.enum(["active", "inactive"]).default("active"),
});
export type Color = z.infer<typeof colorSchema>;
export type ColorForm = z.infer<typeof colorSchema>;

export const createColorSchema = colorSchema
  .pick({
    nameColor: true,
    description: true,
    created_at: true,
    status: true,
  })
  .required();
export type ICreateColorForm = z.infer<typeof createColorSchema>;

export const updateColorSchema = colorSchema
  .pick({
    id: true,
    nameColor: true,
    description: true,
    status: true,
    updated_at: true,
  })
  .partial();
export type IUpdateColorForm = z.infer<typeof updateColorSchema>;
