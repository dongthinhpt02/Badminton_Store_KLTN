import { ObjectId } from "mongodb";
import { z } from "zod";

export const importDetailSchema = z.object({
  id: z.string().uuid(),
  importId: z.string().uuid(),
  productItemId: z.string().uuid(),
  nameProductItem: z.string(),
  imgProductItem: z.string(),
  quantity: z.number().min(1),
});
export type ImportDetail = z.infer<typeof importDetailSchema>;
export type ImportDetailForm = z.infer<typeof importDetailSchema>;
export const createImportDetailSchema = importDetailSchema
  .pick({
    importId: true,
    productItemId: true,
    nameProductItem: true,
    imgProductItem: true,
    quantity: true,
  })
  .required();
export type ICreateImportDetailForm = z.infer<typeof createImportDetailSchema>;
