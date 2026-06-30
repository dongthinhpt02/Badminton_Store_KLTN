import { and, eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { categories } from "../../../src/shared/common/neon/schema/categorySchema";
import { ICateRepository } from "../interface";
import { Cate, ICreateCateForm, IUpdateCateForm, Status } from "../model";

export class CategoryRepo implements ICateRepository {
  async insert(cate: ICreateCateForm): Promise<Cate> {
    const result = await db
      .insert(categories)
      .values({
        ...cate,
        nameCate: cate.nameCate.trim(),
        imageCate: cate.imageCate?.trim() ?? null,
        description: cate.description?.trim() ?? null,
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async update(id: string, form: IUpdateCateForm): Promise<Cate | null> {
    const updateData: Partial<typeof categories.$inferInsert> = {
      updated_at: new Date(),
    };

    if (form.nameCate !== undefined) {
      updateData.nameCate = form.nameCate.trim();
    }

    if (form.imageCate !== undefined) {
      // undefined -> không cập nhật
      // null -> xóa ảnh (nếu schema cho phép)
      // string -> cập nhật ảnh mới
      updateData.imageCate = form.imageCate?.trim() ?? null;
    }

    if (form.description !== undefined) {
      updateData.description = form.description?.trim() ?? null;
    }

    if (form.status !== undefined) {
      updateData.status = form.status;
    }

    const result = await db
      .update(categories)
      .set(updateData)
      .where(eq(categories.id, id))
      .returning();

    return result[0] ?? null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(categories)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(categories)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<Cate | null> {
    const result = await db
      .select()
      .from(categories)
      .where(and(eq(categories.status, Status.ACTIVE), eq(categories.id, id)))
      .limit(1);
    return result[0] ?? null;
  }
  async findByIdAdmin(id: string): Promise<Cate | null> {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findByName(cateName: string): Promise<Cate[] | null> {
    const result = await db
      .select()
      .from(categories)
      .where(
        and(
          eq(categories.status, Status.ACTIVE),
          eq(categories.nameCate, cateName),
        ),
      );
    return result ?? null;
  }
  async findByNameAdmin(cateName: string): Promise<Cate[] | null> {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.nameCate, cateName));
    return result ?? null;
  }
  async findAllCateActive(): Promise<Cate[]> {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.status, Status.ACTIVE));
    return result;
  }
  async findAllCateInactive(): Promise<Cate[]> {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.status, Status.INACTIVE));
    return result;
  }
  async findAllCate(): Promise<Cate[]> {
    const result = await db.select().from(categories);
    return result;
  }
}
