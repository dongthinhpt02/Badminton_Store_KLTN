import { and, eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { promotions } from "../../../src/shared/common/neon/schema";
import { IPromotionRepository } from "../interface";
import {
  ICreatePromotionForm,
  IUpdatePromotionForm,
  Promotion,
  Status,
} from "../model";

export class PromotionRepo implements IPromotionRepository {
  async insert(promotion: ICreatePromotionForm): Promise<Promotion> {
    const result = await db
      .insert(promotions)
      .values({
        ...promotion,
        codePromotion: promotion.codePromotion.trim(),
        valuePromotion: promotion.valuePromotion ?? 0,
        //  valuePromotion: String(Number(promotion.valuePromotion ?? 0) / 100).toString().trim(),
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    console.log(result[0].valuePromotion, "valuePromotion");
    return result[0];
  }
  async update(
    id: string,
    form: IUpdatePromotionForm,
  ): Promise<Promotion | null> {
    const result = await db
      .update(promotions)
      .set({
        ...form,
        codePromotion: form.codePromotion?.trim(),
        valuePromotion: form.valuePromotion ?? 0,
        // valuePromotion: String(Number(form.valuePromotion ?? 0) / 100).toString().trim(),
        updated_at: new Date(),
      })
      .where(eq(promotions.id, id))
      .returning();
    return result[0] ?? null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(promotions)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(promotions.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(promotions)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(promotions.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<Promotion | null> {
    const result = await db
      .select()
      .from(promotions)
      .where(eq(promotions.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findByIdAdmin(id: string): Promise<Promotion | null> {
    const result = await db
      .select()
      .from(promotions)
      .where(eq(promotions.id, id))
      .limit(1);
    return result[0] ?? null;
  }
  async findByName(namePromotion: string): Promise<Promotion[] | null> {
    const result = await db
      .select()
      .from(promotions)
      .where(
        and(
          eq(promotions.codePromotion, namePromotion.trim()),
          eq(promotions.status, Status.ACTIVE),
        ),
      );
    return result.length > 0 ? result : null;
  }
  async findByNameAdmin(namePromotion: string): Promise<Promotion[] | null> {
    const result = await db
      .select()
      .from(promotions)
      .where(eq(promotions.codePromotion, namePromotion.trim()));
    return result.length > 0 ? result : null;
  }
  async findAllPromotionActive(): Promise<Promotion[]> {
    const result = await db
      .select()
      .from(promotions)
      .where(eq(promotions.status, Status.ACTIVE));
    return result;
  }
  async findAllPromotionInactive(): Promise<Promotion[]> {
    const result = await db
      .select()
      .from(promotions)
      .where(eq(promotions.status, Status.INACTIVE));
    return result;
  }
  async findAllPromotion(): Promise<Promotion[]> {
    const result = await db.select().from(promotions);
    return result;
  }
}
