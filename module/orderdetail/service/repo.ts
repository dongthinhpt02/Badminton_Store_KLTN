import { db } from "../../../src/shared/common/neon";
import { orderDetails } from "../../../src/shared/common/neon/schema";
import { IOrderDetailRepository } from "../interface";
import { ICreateOrderDetail, OrderDetail } from "../model";
import { eq } from "drizzle-orm";

export class OrderDetailRepo implements IOrderDetailRepository {
  async insertOrderDetail(form: ICreateOrderDetail): Promise<any> {
    const result = await db
      .insert(orderDetails)
      .values({
        ...form,
      })
      .returning();
    return result[0];
  }
  async getOrderDetailByOrderId(orderId: string): Promise<OrderDetail[]> {
    const result = await db
      .select()
      .from(orderDetails)
      .where(eq(orderDetails.orderId, orderId));
    return result as OrderDetail[];
  }
}
