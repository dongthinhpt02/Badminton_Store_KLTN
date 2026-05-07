import { and, eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { products } from "../../../src/shared/common/neon/schema";
import { IProductRepository } from "../interface";
import {
  ICreateProductForm,
  IUpdateProductForm,
  Product,
  Status,
} from "../model";

export class ProductRepo implements IProductRepository {
  async insert(product: ICreateProductForm): Promise<Product> {
    const result = await db
      .insert(products)
      .values({
        ...product,
        nameProduct: product.nameProduct.trim(),
        imageProduct: product.imageProduct?.trim() ?? null,
        description: product.description?.trim() ?? null,
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async update(id: string, form: IUpdateProductForm): Promise<Product | null> {
    const result = await db
      .update(products)
      .set({
        ...form,
        nameProduct: form.nameProduct?.trim(),
        imageProduct: form.imageProduct?.trim() ?? null,
        description: form.description?.trim() ?? null,
        updated_at: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    return result[0] ?? null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(products)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(products)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<Product | null> {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findByIdAdmin(id: string): Promise<Product | null> {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findByName(nameProduct: string): Promise<Product[] | null> {
    const result = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.nameProduct, nameProduct),
          eq(products.status, Status.ACTIVE),
        ),
      );
    return result.length > 0 ? result : null;
  }
  async findByNameAdmin(nameProduct: string): Promise<Product[] | null> {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.nameProduct, nameProduct));
    return result.length > 0 ? result : null;
  }
  async findAllProductActive(): Promise<Product[]> {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.status, Status.ACTIVE));
    return result;
  }
  async findAllProductInactive(): Promise<Product[]> {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.status, Status.INACTIVE));
    return result;
  }
  async findAllProduct(): Promise<Product[]> {
    const result = await db.select().from(products);
    return result;
  }
}
