import { and, eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { Brand, ICreateBrandForm, IUpdateBrandForm, Status } from "../model";
import { brands } from "../../../src/shared/common/neon/schema";
import { IBrandRepository } from "../interface";

export class BrandRepo implements IBrandRepository {
  async insert(brand: ICreateBrandForm): Promise<Brand> {
    const result = await db
      .insert(brands)
      .values({
        ...brand,
        nameBrand: brand.nameBrand.trim(),
        imageBrand: brand.imageBrand?.trim() ?? null,
        country: brand.country?.trim() ?? null,
        description: brand.description?.trim() ?? null,
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async update(id: string, form: IUpdateBrandForm): Promise<Brand | null> {
    const result = await db
      .update(brands)
      .set({
        ...form,
        nameBrand: form.nameBrand?.trim(),
        imageBrand: form.imageBrand?.trim(),
        country: form.country?.trim() ?? null,
        description: form.description?.trim(),
        updated_at: new Date(),
      })
      .where(eq(brands.id, id))
      .returning();
    return result[0];
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(brands)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(brands.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(brands)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(brands.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<Brand | null> {
    const result = await db
      .select()
      .from(brands)
      .where(and(eq(brands.status, Status.ACTIVE), eq(brands.id, id)))
      .limit(1);
    return result[0] ?? null;
  }
  async findByIdAdmin(id: string): Promise<Brand | null> {
    const result = await db
      .select()
      .from(brands)
      .where(eq(brands.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findByName(brandName: string): Promise<Brand[] | null> {
    const result = await db
      .select()
      .from(brands)
      .where(
        and(eq(brands.status, Status.ACTIVE), eq(brands.nameBrand, brandName)),
      );
    return result ?? null;
  }
  async findByNameAdmin(brandName: string): Promise<Brand[] | null> {
    const result = await db
      .select()
      .from(brands)
      .where(eq(brands.nameBrand, brandName));
    return result ?? null;
  }
  async findAllBrandActive(): Promise<Brand[]> {
    const result = await db
      .select()
      .from(brands)
      .where(eq(brands.status, Status.ACTIVE));
    return result;
  }
  async findAllBrandInactive(): Promise<Brand[]> {
    const result = await db
      .select()
      .from(brands)
      .where(eq(brands.status, Status.INACTIVE));
    return result;
  }
  async findAllBrand(): Promise<Brand[]> {
    const result = await db.select().from(brands);
    return result;
  }
}
