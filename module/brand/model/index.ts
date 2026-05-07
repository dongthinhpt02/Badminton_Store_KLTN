import { z } from "zod";
import { ErrNameBrandInvalid } from "./error";

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const brandSchema = z.object({
  id: z.string().uuid(),
  nameBrand: z.string().regex(/^[\p{L}0-9 ]+$/u, ErrNameBrandInvalid.message),
  imageBrand: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  created_at: z.date(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  restored_at: z.date().nullable(),
});
export type Brand = z.infer<typeof brandSchema>;
export type BrandForm = z.infer<typeof brandSchema>;

export const createBrandSchema = brandSchema.pick({
  nameBrand: true,
  imageBrand: true,
  country: true,
  description: true,
  status: true,
  created_at: true,
});
export type ICreateBrandForm = z.infer<typeof createBrandSchema>;

export const updateBrandSchema = brandSchema
  .pick({
    id: true,
    nameBrand: true,
    imageBrand: true,
    country: true,
    description: true,
    status: true,
    updated_at: true,
  })
  .partial();
export type IUpdateBrandForm = z.infer<typeof updateBrandSchema>;
