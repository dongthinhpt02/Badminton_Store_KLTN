import { z } from "zod";

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const supplierSchema = z.object({
  id: z.string().uuid(),
  nameSupplier: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Tên Nha Cung Cap chi dc chua chu ca, so va dau cach",
  }),
  address: z.string().regex(/^[\p{L}0-9 ]+$/u, {
    message: "Dia Chi chi dc chua chu ca, so va dau cach",
  }),
  status: z.enum(["active", "inactive"]).default("active"),
  created_at: z.date(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  restored_at: z.date().nullable(),
});
export type Supplier = z.infer<typeof supplierSchema>;
export type SupplierForm = z.infer<typeof supplierSchema>;

export const createSupplierSchema = supplierSchema
  .pick({
    nameSupplier: true,
    address: true,
    status: true,
    created_at: true,
  })
  .required();
export type ICreateSupplierForm = z.infer<typeof createSupplierSchema>;

export const updateSupplierSchema = supplierSchema
  .pick({
    id: true,
    nameSupplier: true,
    address: true,
    status: true,
    updated_at: true,
  })
  .partial();
export type IUpdateSupplierForm = z.infer<typeof updateSupplierSchema>;
