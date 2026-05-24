import { eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { stores } from "../../../src/shared/common/neon/schema/storeSchema";
import { IStoreRepository } from "../interface";
import { ICreateStoreForm, IUpdateStoreForm, Status, Store } from "../model";

export class StoreRepo implements IStoreRepository {
  async insert(form: ICreateStoreForm): Promise<Store> {
    // check đã có store active chưa
    const activeStore = await db
      .select()
      .from(stores)
      .where(eq(stores.status, Status.ACTIVE))
      .limit(1);

    // nếu chưa có store nào => active
    const status = activeStore.length === 0 ? Status.ACTIVE : Status.INACTIVE;

    const result = await db
      .insert(stores)
      .values({
        ...form,
        nameStore: form.nameStore.trim(),
        from_province: form.from_province,
        from_district: form.from_district,
        from_ward: form.from_ward,
        from_address: form.from_address.trim(),
        status,
        created_at: new Date(),
      })
      .returning();

    return result[0];
  }

  async update(id: string, form: IUpdateStoreForm): Promise<Store | null> {
    const result = await db
      .update(stores)
      .set({
        ...form,
        nameStore: form.nameStore?.trim(),
        from_province: form.from_province,
        from_district: form.from_district,
        from_ward: form.from_ward,
        from_address: form.from_address?.trim(),
        updated_at: new Date(),
      })
      .where(eq(stores.id, id))
      .returning();
    return result[0] || null;
  }
  async active(id: string): Promise<boolean> {
    // inactive toàn bộ store
    await db.update(stores).set({
      status: Status.INACTIVE,
      inactivated_at: new Date(),
    });

    // active store được chọn
    const result = await db
      .update(stores)
      .set({
        status: Status.ACTIVE,
        activated_at: new Date(),
      })
      .where(eq(stores.id, id))
      .returning();

    return result.length > 0;
  }
  async findByIdAdmin(id: string): Promise<Store | null> {
    const result = await db
      .select()
      .from(stores)
      .where(eq(stores.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findInactiveByAdmin(): Promise<Store[] | null> {
    const result = await db
      .select()
      .from(stores)
      .where(eq(stores.status, Status.INACTIVE));
    return result ?? null;
  }
  async findActiveByAdmin(): Promise<Store | null> {
    const result = await db
      .select()
      .from(stores)
      .where(eq(stores.status, Status.ACTIVE))
      .limit(1);
    return result[0] ?? null;
  }
  async findAll(): Promise<Store[]> {
    const result = await db.select().from(stores);
    return result;
  }
}
