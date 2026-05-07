import { eq, and } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { sizeTypes } from "../../../src/shared/common/neon/schema/sizeTypeSchema";
import { ISizeTypeRepository } from "../interface";
import {
  ICreateSizeTypeForm,
  IUpdateSizeTypeForm,
  SizeType,
  Status,
} from "../model";

export class SizeTypeRepo implements ISizeTypeRepository {
  async insert(sizeType: ICreateSizeTypeForm): Promise<SizeType> {
    const result = await db
      .insert(sizeTypes)
      .values({
        ...sizeType,
        nameSizeType: sizeType.nameSizeType.trim(),
        description: sizeType.description?.trim() ?? null,
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async update(
    id: string,
    form: IUpdateSizeTypeForm,
  ): Promise<SizeType | null> {
    const result = await db
      .update(sizeTypes)
      .set({
        ...form,
        nameSizeType: form.nameSizeType?.trim(),
        description: form.description?.trim(),
        updated_at: new Date(),
      })
      .where(eq(sizeTypes.id, id))
      .returning();
    return result[0] ?? null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(sizeTypes)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(sizeTypes.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(sizeTypes)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(sizeTypes.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<SizeType | null> {
    const result = await db
      .select()
      .from(sizeTypes)
      .where(and(eq(sizeTypes.id, id), eq(sizeTypes.status, Status.ACTIVE)))
      .limit(1);
    return result[0] ?? null;
  }
  async findByIdAdmin(id: string): Promise<SizeType | null> {
    const result = await db
      .select()
      .from(sizeTypes)
      .where(eq(sizeTypes.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findByName(name: string): Promise<SizeType[] | null> {
    const result = await db
      .select()
      .from(sizeTypes)
      .where(
        and(
          eq(sizeTypes.nameSizeType, name),
          eq(sizeTypes.status, Status.ACTIVE),
        ),
      );
    return result.length > 0 ? result : null;
  }
  async findByNameAdmin(name: string): Promise<SizeType[] | null> {
    const result = await db
      .select()
      .from(sizeTypes)
      .where(eq(sizeTypes.nameSizeType, name));
    return result.length > 0 ? result : null;
  }
  async findAllActive(): Promise<SizeType[]> {
    const result = await db
      .select()
      .from(sizeTypes)
      .where(eq(sizeTypes.status, Status.ACTIVE));
    return result;
  }
  async findAllInactive(): Promise<SizeType[]> {
    const result = await db
      .select()
      .from(sizeTypes)
      .where(eq(sizeTypes.status, Status.INACTIVE));
    return result;
  }
  async findAll(): Promise<SizeType[]> {
    const result = await db.select().from(sizeTypes);
    return result;
  }
}
