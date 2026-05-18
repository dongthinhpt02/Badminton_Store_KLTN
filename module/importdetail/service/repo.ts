import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { importDetails } from "../../../src/shared/common/neon/schema";
import { IProductItemRepository } from "../../productitem/interface";
import { IImportDetailRepository } from "../inteface";
import {
  createImportDetailSchema,
  ICreateImportDetailForm,
  ImportDetail,
} from "../model";

export class ImportDetailRepo implements IImportDetailRepository {
  constructor(private readonly productItemRepository: IProductItemRepository) {}
  async insert(form: ICreateImportDetailForm): Promise<ImportDetail> {
    // validate
    const newImportDetail = createImportDetailSchema.parse(form);

    // insert import detail
    const result = await db
      .insert(importDetails)
      .values(newImportDetail)
      .returning();

    // tìm product item
    const findProductItem = await this.productItemRepository.findById(
      newImportDetail.productItemId,
    );

    if (!findProductItem) {
      throw new Error("ProductItem not found");
    }

    // cộng tồn kho
    const oldQuantity = findProductItem.quantity || 0;

    const newQuantity = oldQuantity + newImportDetail.quantity;

    // update quantity
    await this.productItemRepository.updateQuantity(
      newImportDetail.productItemId,
      newQuantity,
    );

    return result[0];
  }
  async findById(id: string): Promise<ImportDetail | null> {
    const result = await db
      .select()
      .from(importDetails)
      .where(eq(importDetails.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findAll(): Promise<ImportDetail[]> {
    const result = await db.select().from(importDetails);
    return result;
  }
  async findByImportId(importId: string): Promise<ImportDetail[] | null> {
    const result = await db
      .select()
      .from(importDetails)
      .where(eq(importDetails.importId, importId));
    return result.length > 0 ? result : null;
  }
  async findByProductItemId(
    productItemId: string,
  ): Promise<ImportDetail[] | null> {
    const result = await db
      .select()
      .from(importDetails)
      .where(eq(importDetails.productItemId, productItemId));
    return result.length > 0 ? result : null;
  }
}
