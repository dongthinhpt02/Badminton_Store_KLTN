import { db } from "../../../src/shared/common/neon";
import { orderDetails, orders } from "../../../src/shared/common/neon/schema";
import { OrderDetail } from "../../orderdetail/model";
import { IOrderRepository } from "../interface";
import { ICreateOrderForm, Order, OrderStatus } from "../model";
import { eq } from "drizzle-orm";

export class OrderRepo implements IOrderRepository {
  async insertOrder(form: ICreateOrderForm): Promise<Order> {
    const result = await db
      .insert(orders)
      .values({
        userId: form.userId,
        fullname: form.fullname,
        totalQuantity: form.totalQuantity,
        totalCart: form.totalCart,
        shippingFee: form.shippingFee,
        totalCartOrder: form.totalCartOrder,
        address: form.address,
        phonenumber: form.phonenumber,
        status: OrderStatus.PROCESSING,
        namePayment: form.namePayment,
        from_district_id: form.from_district_id,
        from_ward_code: form.from_ward_code,
        to_district_id: form.to_district_id,
        to_ward_code: form.to_ward_code,
        cod_amount: form.cod_amount,
        created_at: form.created_at,
      })
      .returning();
    return result[0] as Order;
  }
  async getAllOrder(): Promise<Order[]> {
    const result = await db.select().from(orders);
    return result as Order[];
  }
  async getOrderDetail(orderId: string): Promise<OrderDetail[]> {
    const result = await db
      .select()
      .from(orderDetails)
      .where(eq(orderDetails.orderId, orderId));
    return result;
  }
  async getOrderByOrderId(orderId: string): Promise<Order> {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    return result[0] as Order;
  }
  async getAllOrderByUserId(userId: string): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));
    return result as Order[];
  }
}
