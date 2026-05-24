import { z } from "zod";

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const storeSchema = z.object({
  id: z.string().uuid(),
  nameStore: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Ten Cua Hang chi dc chua chu ca, so va dau cach",
  }),
  from_province: z.number().int(),
  from_district: z.number().int(),
  from_ward: z.string(),
  from_address: z.string(),
  status: z.enum(["active", "inactive"]).default("inactive"),
  created_at: z.date(),
  updated_at: z.date().nullable(),
  activated_at: z.date().nullable(),
  inactivated_at: z.date().nullable(),
});
export type Store = z.infer<typeof storeSchema>;
export type StoreForm = z.infer<typeof storeSchema>;

export const createStoreSchema = storeSchema
  .pick({
    nameStore: true,
    from_province: true,
    from_district: true,
    from_ward: true,
    from_address: true,
    status: true,
    created_at: true,
  })
  .required();

export type ICreateStoreForm = z.infer<typeof createStoreSchema>;

export const updateStoreSchema = storeSchema
  .pick({
    id: true,
    nameStore: true,
    from_province: true,
    from_district: true,
    from_ward: true,
    from_address: true,
    updated_at: true,
  })
  .partial();

export type IUpdateStoreForm = z.infer<typeof updateStoreSchema>;
