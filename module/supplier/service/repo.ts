import { and, eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { suppliers } from "../../../src/shared/common/neon/schema";
import { ISupplierRepository } from "../interface";
import {
  ICreateSupplierForm,
  IUpdateSupplierForm,
  Status,
  Supplier,
} from "../model";

export class SupplierRepo implements ISupplierRepository {
  async insert(supplier: ICreateSupplierForm): Promise<Supplier> {
    const result = await db
      .insert(suppliers)
      .values({
        ...supplier,
        nameSupplier: supplier.nameSupplier.trim(),
        address: supplier.address?.trim() ?? null,
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async update(
    id: string,
    form: IUpdateSupplierForm,
  ): Promise<Supplier | null> {
    const result = await db
      .update(suppliers)
      .set({
        ...form,
      })
      .where(eq(suppliers.id, id))
      .returning();
    return result[0];
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(suppliers)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(suppliers.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(suppliers)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(suppliers.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<Supplier | null> {
    const result = await db
      .select()
      .from(suppliers)
      .where(and(eq(suppliers.id, id), eq(suppliers.status, Status.ACTIVE)))
      .limit(1);
    return result[0] ?? null;
  }
  async findByIdAdmin(id: string): Promise<Supplier | null> {
    const result = await db
      .select()
      .from(suppliers)
      .where(eq(suppliers.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findByName(name: string): Promise<Supplier[] | null> {
    const result = await db
      .select()
      .from(suppliers)
      .where(
        and(
          eq(suppliers.nameSupplier, name.trim()),
          eq(suppliers.status, Status.ACTIVE),
        ),
      );
    return result.length > 0 ? result : null;
  }
  async findByNameAdmin(name: string): Promise<Supplier[] | null> {
    const result = await db
      .select()
      .from(suppliers)
      .where(eq(suppliers.nameSupplier, name.trim()));
    return result.length > 0 ? result : null;
  }
  async findAllActive(): Promise<Supplier[]> {
    const result = await db
      .select()
      .from(suppliers)
      .where(eq(suppliers.status, Status.ACTIVE));
    return result;
  }
  async findAllInactive(): Promise<Supplier[]> {
    const result = await db
      .select()
      .from(suppliers)
      .where(eq(suppliers.status, Status.INACTIVE));
    return result;
  }
  async findAll(): Promise<Supplier[]> {
    const result = await db.select().from(suppliers);
    return result;
  }
}
