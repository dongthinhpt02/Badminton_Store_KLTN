import { ObjectId } from "mongodb";
import { z } from "zod";

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export const sizeSchema = z.object({
  id: z.string().uuid(),

  sizeTypeId: z.string().uuid(), // 🔑 bắt buộc (FK)

  nameSize: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Tên Size chỉ được chứa chữ cái, số và dấu cách",
  }),

  status: z.enum(["active", "inactive"]).default("active"),

  created_at: z.date(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  restored_at: z.date().nullable(),
});
export type Size = z.infer<typeof sizeSchema>;
export type SizeForm = z.infer<typeof sizeSchema>;

export const createSizeSchema = sizeSchema
  .pick({
    sizeTypeId: true,
    nameSize: true,
    created_at: true,
    status: true,
  })
  .required();
export type ICreateSizeForm = z.infer<typeof createSizeSchema>;
export const updateSizeSchema = sizeSchema
  .pick({
    id: true,
    nameSize: true,
    status: true,
    updated_at: true,
  })
  .partial();
export type IUpdateSizeForm = z.infer<typeof updateSizeSchema>;
