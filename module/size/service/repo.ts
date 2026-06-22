import { and, eq, ilike, asc } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { sizes, sizeTypes } from "../../../src/shared/common/neon/schema";
import { ISizeRepository } from "../interface";
import { ICreateSizeForm, IUpdateSizeForm, Size, Status } from "../model";

export class SizeRepo implements ISizeRepository {
  async insert(size: ICreateSizeForm): Promise<Size> {
    const result = await db
      .insert(sizes)
      .values({
        ...size,
        nameSize: size.nameSize.trim(),

        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }

  async update(id: string, form: IUpdateSizeForm): Promise<Size | null> {
    const result = await db
      .update(sizes)
      .set({
        ...form,
        updated_at: new Date(),
      })
      .where(eq(sizes.id, id))
      .returning();
    return result[0] || null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(sizes)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(sizes.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(sizes)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(sizes.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<Size | null> {
    const result = await db
      .select()
      .from(sizes)
      .where(and(eq(sizes.id, id), eq(sizes.status, Status.ACTIVE)))
      .limit(1);
    return result[0] ?? null;
  }
  async findByIdAdmin(id: string): Promise<Size | null> {
    const result = await db
      .select()
      .from(sizes)
      .where(eq(sizes.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findByName(name: string): Promise<Size[] | null> {
    const result = await db
      .select()
      .from(sizes)
      .where(
        and(eq(sizes.nameSize, name.trim()), eq(sizes.status, Status.ACTIVE)),
      );
    return result.length > 0 ? result : null;
  }
  async findByNameAdmin(name: string): Promise<Size[] | null> {
    const result = await db
      .select()
      .from(sizes)
      .where(eq(sizes.nameSize, name.trim()));
    return result.length > 0 ? result : null;
  }
  async findAllActive(): Promise<Size[]> {
    const result = await db
      .select()
      .from(sizes)
      .where(eq(sizes.status, Status.ACTIVE));
    return result;
  }
  async findAllInactive(): Promise<Size[]> {
    const result = await db
      .select()
      .from(sizes)
      .where(eq(sizes.status, Status.INACTIVE));
    return result;
  }
  async findAll(): Promise<Size[]> {
    const result = await db.select().from(sizes);
    return result;
  }
  async findSizeBySizeTypeId(sizeTypeId: string): Promise<Size[]> {
    const result = await db
      .select()
      .from(sizes)
      .where(
        and(eq(sizes.status, Status.ACTIVE), eq(sizes.sizeTypeId, sizeTypeId)),
      );
    return result;
  }
  async findSizeBySizeTypeIdAdmin(sizeTypeId: string): Promise<Size[]> {
    const result = await db
      .select()
      .from(sizes)
      .where(eq(sizes.sizeTypeId, sizeTypeId));
    return result;
  }

  async findSizeBySizeTypeName(sizeTypeName: string): Promise<Size[]> {
    const result = await db
      .select()
      .from(sizes)
      .innerJoin(sizeTypes, eq(sizes.sizeTypeId, sizeTypes.id))
      .where(
        and(
          ilike(sizeTypes.nameSizeType, `%${sizeTypeName}%`),
          eq(sizes.status, Status.ACTIVE),
        ),
      );

    return result.map((row) => row.sizes);
  }
  async findSizeBySizeTypeNameAdmin(sizeTypeName: string): Promise<Size[]> {
    const result = await db
      .select()
      .from(sizes)
      .innerJoin(sizeTypes, eq(sizes.sizeTypeId, sizeTypes.id))
      .where(ilike(sizeTypes.nameSizeType, `%${sizeTypeName}%`));

    return result.map((row) => row.sizes);
  }
  async findSizeAddNameSizeType(): Promise<any[]> {
    const result = await db
      .select({
        id: sizes.id,
        sizeTypeId: sizes.sizeTypeId,
        nameSize: sizes.nameSize,
        status: sizes.status,
        created_at: sizes.created_at,
        updated_at: sizes.updated_at,
        deleted_at: sizes.deleted_at,
        restored_at: sizes.restored_at,

        nameSizeType: sizeTypes.nameSizeType,
      })
      .from(sizes)
      .innerJoin(sizeTypes, eq(sizes.sizeTypeId, sizeTypes.id))
      .orderBy(asc(sizeTypes.nameSizeType));

    return result;
  }
}
