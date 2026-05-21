import { eq } from "drizzle-orm";
import { db } from "../../../src/shared/common/neon";
import { payments } from "../../../src/shared/common/neon/schema";
import { IPaymentRepository } from "../interface";
import {
  ICreatePaymentForm,
  IUpdatePaymentForm,
  Payment,
  Status,
} from "../model";

export class PaymentRepo implements IPaymentRepository {
  async insert(form: ICreatePaymentForm): Promise<Payment> {
    const result = await db
      .insert(payments)
      .values({
        ...form,
        namePayment: form.namePayment.trim(),
        status: Status.ACTIVE,
        created_at: new Date(),
      })
      .returning();
    return result[0];
  }
  async update(id: string, form: IUpdatePaymentForm): Promise<Payment | null> {
    const result = await db
      .update(payments)
      .set({
        ...form,
        updated_at: new Date(),
      })
      .where(eq(payments.id, id))
      .returning();
    return result[0];
  }
  async delete(id: string): Promise<boolean> {
    const result = await db
      .update(payments)
      .set({ status: Status.INACTIVE, deleted_at: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return result.length > 0;
  }
  async restore(id: string): Promise<boolean> {
    const result = await db
      .update(payments)
      .set({ status: Status.ACTIVE, restored_at: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return result.length > 0;
  }
  async findById(id: string): Promise<Payment | null> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.id, id))
      .limit(1);
    return result[0] || null;
  }
  async findByIdAdmin(id: string): Promise<Payment | null> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.id, id))
      .limit(1);
    return result[0] || null;
  }
  async findByName(name: string): Promise<Payment[] | null> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.namePayment, name.trim()));
    return result || null;
  }
  async findByNameAdmin(name: string): Promise<Payment[] | null> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.namePayment, name.trim()));
    return result || null;
  }
  async findAllPaymentActive(): Promise<Payment[]> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.status, Status.ACTIVE));
    return result;
  }
  async findAllPaymentInactive(): Promise<Payment[]> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.status, Status.INACTIVE));
    return result;
  }
  async findAllPayment(): Promise<Payment[]> {
    const result = await db.select().from(payments);
    return result;
  }
}
