import { db } from "../../../src/shared/common/neon";
import {
  brands,
  categories,
  orderDetails,
  orders,
  productItems,
  products,
} from "../../../src/shared/common/neon/schema";
import { OrderDetail } from "../../orderdetail/model";
import { IOrderRepository } from "../interface";
import { ICreateOrderForm, Order, OrderStatus } from "../model";
import { and, eq, gte, lte, sql, desc } from "drizzle-orm";

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
  async getAllOrderProcessing(): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.status, OrderStatus.PROCESSING));
    return result as Order[];
  }
  async getAllOrderDelivered(): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.status, OrderStatus.DELIVERED));
    return result as Order[];
  }
  async getAllOrderCompleted(): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED));
    return result as Order[];
  }
  async getAllOrderCancelled(): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.status, OrderStatus.CANCELLED));
    return result as Order[];
  }
  async getAllOrderProcessingByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]> {
    const start = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T23:59:59.999Z`);
    const result = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.status, OrderStatus.PROCESSING),
          gte(orders.created_at, start),
          lte(orders.created_at, end),
        ),
      );
    return result as Order[];
  }
  async getAllOrderDeliveredByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]> {
    const start = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T23:59:59.999Z`);
    const result = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.status, OrderStatus.DELIVERED),
          gte(orders.created_at, start),
          lte(orders.created_at, end),
        ),
      );
    return result as Order[];
  }
  async getAllOrderCompletedByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]> {
    const start = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T23:59:59.999Z`);
    const result = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.status, OrderStatus.COMPLETED),
          gte(orders.created_at, start),
          lte(orders.created_at, end),
        ),
      );
    return result as Order[];
  }
  async getAllOrderCancelledByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]> {
    const start = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T23:59:59.999Z`);
    const result = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.status, OrderStatus.CANCELLED),
          gte(orders.created_at, start),
          lte(orders.created_at, end),
        ),
      );
    return result as Order[];
  }
  async getOrderByOrderId(orderId: string): Promise<Order> {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    return result[0] as Order;
  }
  async CancelledOrderAdmin(orderId: string): Promise<Order> {
    const result = await db
      .update(orders)
      .set({
        status: OrderStatus.CANCELLED,
      })
      .where(eq(orders.id, orderId))
      .returning();

    return result[0] as Order;
  }
  async TakeOrderDeliveredAdmin(orderId: string): Promise<Order> {
    const result = await db
      .update(orders)
      .set({
        status: OrderStatus.DELIVERED,
      })
      .where(
        and(eq(orders.id, orderId), eq(orders.status, OrderStatus.PROCESSING)),
      )
      .returning();

    return result[0] as Order;
  }
  //user
  async getAllOrderByUserId(userId: string): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));
    return result as Order[];
  }
  async getDetailOrderByOrderId(orderId: string): Promise<OrderDetail[]> {
    const result = await db
      .select()
      .from(orderDetails)
      .where(eq(orderDetails.orderId, orderId));
    return result as OrderDetail[];
  }
  async getOrderProcessingByUserId(userId: string): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.userId, userId),
          eq(orders.status, OrderStatus.PROCESSING),
        ),
      );
    return result as Order[];
  }
  async getOrderDeliveredByUserId(userId: string): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.userId, userId),
          eq(orders.status, OrderStatus.DELIVERED),
        ),
      );
    return result as Order[];
  }
  async getOrderCompletedByUserId(userId: string): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.userId, userId),
          eq(orders.status, OrderStatus.COMPLETED),
        ),
      );
    return result as Order[];
  }
  async getOrderCancelledByUserId(userId: string): Promise<Order[]> {
    const result = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.userId, userId),
          eq(orders.status, OrderStatus.CANCELLED),
        ),
      );
    return result as Order[];
  }
  async takeOrderCompletedByUserId(
    id: string,
    userId: string,
  ): Promise<Order[]> {
    const result = await db
      .update(orders)
      .set({ status: OrderStatus.COMPLETED })
      .where(
        and(
          eq(orders.id, id),
          eq(orders.userId, userId),
          eq(orders.status, OrderStatus.DELIVERED),
        ),
      )
      .returning();
    return result as Order[];
  }
  async generalStatistic(): Promise<any> {
    // Tổng số đơn hoàn thành
    const totalOrdersResult = await db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED));

    const totalOrders = Number(totalOrdersResult[0]?.total ?? 0);

    // Doanh thu theo phương thức thanh toán
    const revenueByPaymentRaw = await db
      .select({
        namePayment: orders.namePayment,
        totalRevenue: sql<number>`sum(${orders.totalCart})`,
      })
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED))
      .groupBy(orders.namePayment);

    const revenueByPayment = revenueByPaymentRaw.map((item) => ({
      namePayment: item.namePayment,
      totalRevenue: Number(item.totalRevenue),
    }));
    // Doanh thu theo tháng
    const result = await db
      .select({
        year: sql<number>`extract(year from ${orders.created_at})`,
        month: sql<number>`extract(month from ${orders.created_at})`,
        totalRevenue: sql<number>`sum(${orders.totalCart})`,
      })
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED))
      .groupBy(
        sql`extract(year from ${orders.created_at})`,
        sql`extract(month from ${orders.created_at})`,
      )
      .orderBy(
        sql`extract(year from ${orders.created_at})`,
        sql`extract(month from ${orders.created_at})`,
      );

    const revenueByMonth = result.map((item) => ({
      id: {
        month: Number(item.month),
        year: Number(item.year),
      },
      totalRevenue: Number(item.totalRevenue),
    }));
    // Tổng sản phẩm đã bán
    const totalProductsResult = await db
      .select({
        total: sql<number>`sum(${orders.totalQuantity})`,
      })
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED));

    const totalProducts = Number(totalProductsResult[0]?.total ?? 0);

    // Tổng số user đã mua hàng
    const totalUsersResult = await db
      .select({
        totalUsers: sql<number>`count(distinct ${orders.userId})`,
      })
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED));

    const totalUsersBought = Number(totalUsersResult[0]?.totalUsers ?? 0);

    return {
      totalOrders,
      revenueByPayment,
      revenueByMonth,
      totalProductItemSold: totalProducts,
      totalUsersBought,
    };
  }
  async statisticByStatus(): Promise<any> {
    const result = await db
      .select({
        status: orders.status,
        count: sql<number>`count(*)`,
      })
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED))
      .groupBy(orders.status);

    return result;
  }
  async statisticByTime(): Promise<any> {
    // -------- BY DAY --------
    const byDayRaw = await db
      .select({
        date: sql<string>`to_char(date_trunc('day', ${orders.created_at}), 'YYYY-MM-DD')`,
        revenue: sql<number>`sum(${orders.totalCart})`,
        orderCount: sql<number>`count(*)`,
      })
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED))
      .groupBy(sql`date_trunc('day', ${orders.created_at})`)
      .orderBy(sql`date_trunc('day', ${orders.created_at})`);

    // -------- BY MONTH --------
    const byMonthRaw = await db
      .select({
        date: sql<string>`to_char(date_trunc('month', ${orders.created_at}), 'YYYY-MM')`,
        revenue: sql<number>`sum(${orders.totalCart})`,
        orderCount: sql<number>`count(*)`,
      })
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED))
      .groupBy(sql`date_trunc('month', ${orders.created_at})`)
      .orderBy(sql`date_trunc('month', ${orders.created_at})`);

    // -------- BY YEAR --------
    const byYearRaw = await db
      .select({
        date: sql<string>`to_char(date_trunc('year', ${orders.created_at}), 'YYYY')`,
        revenue: sql<number>`sum(${orders.totalCart})`,
        orderCount: sql<number>`count(*)`,
      })
      .from(orders)
      .where(eq(orders.status, OrderStatus.COMPLETED))
      .groupBy(sql`date_trunc('year', ${orders.created_at})`)
      .orderBy(sql`date_trunc('year', ${orders.created_at})`);

    const byDay = byDayRaw.map((item) => ({
      date: item.date,
      revenue: Number(item.revenue),
      orderCount: Number(item.orderCount),
    }));

    const byMonth = byMonthRaw.map((item) => ({
      date: item.date,
      revenue: Number(item.revenue),
      orderCount: Number(item.orderCount),
    }));

    const byYear = byYearRaw.map((item) => ({
      date: item.date,
      revenue: Number(item.revenue),
      orderCount: Number(item.orderCount),
    }));

    return {
      byDay,
      byMonth,
      byYear,
    };
  }
  async getTopSellingProductItem(): Promise<any> {
    // -------- TOP BY QUANTITY SOLD --------
    const topByQuantity = await db
      .select({
        productItemId: orderDetails.productItemId,
        nameProductItem: orderDetails.nameProductItem,
        imageProductItem: orderDetails.imageProductItem,
        totalQuantitySold: sql<number>`sum(${orderDetails.quantity})::int`,
      })
      .from(orderDetails)
      .innerJoin(orders, eq(orderDetails.orderId, orders.id))
      .where(eq(orders.status, OrderStatus.COMPLETED))
      .groupBy(
        orderDetails.productItemId,
        orderDetails.nameProductItem,
        orderDetails.imageProductItem,
      )
      .orderBy(desc(sql`sum(${orderDetails.quantity})`))
      .limit(10);

    // -------- TOP BY REVENUE --------
    const topByRevenue = await db
      .select({
        productItemId: orderDetails.productItemId,
        nameProductItem: orderDetails.nameProductItem,
        imageProductItem: orderDetails.imageProductItem,
        totalRevenue: sql<number>`sum(${orderDetails.totalPriceOrderDetail})::float`,
      })
      .from(orderDetails)
      .innerJoin(orders, eq(orderDetails.orderId, orders.id))
      .where(eq(orders.status, OrderStatus.COMPLETED))
      .groupBy(
        orderDetails.productItemId,
        orderDetails.nameProductItem,
        orderDetails.imageProductItem,
      )
      .orderBy(desc(sql`sum(${orderDetails.totalPriceOrderDetail})`))
      .limit(10);

    return {
      topByQuantity,
      topByRevenue,
    };
  }
  async getBrandStatistics(): Promise<any[]> {
    const result = await db
      .select({
        brandId: brands.id,
        nameBrand: brands.nameBrand,
        imageBrand: brands.imageBrand,
        totalQuantitySold: sql<number>`SUM(${orderDetails.quantity})::int`,
        totalRevenue: sql<number>`SUM(${orderDetails.totalPriceOrderDetail})::numeric`,
      })
      .from(orderDetails)
      .innerJoin(orders, eq(orderDetails.orderId, orders.id))
      .innerJoin(productItems, eq(orderDetails.productItemId, productItems.id))
      .innerJoin(products, eq(productItems.productId, products.id))
      .innerJoin(brands, eq(products.brandId, brands.id))
      .where(eq(orders.status, OrderStatus.COMPLETED))
      .groupBy(brands.id, brands.nameBrand, brands.imageBrand)
      .orderBy(desc(sql`SUM(${orderDetails.quantity})`));

    return result.map((item) => ({
      ...item,
      totalRevenue: Number(item.totalRevenue),
    }));
  }
  async getCategoryStatistics(): Promise<any[]> {
    const result = await db
      .select({
        cateId: categories.id,
        nameCate: categories.nameCate,
        imageCate: categories.imageCate,

        totalQuantitySold: sql<number>`SUM(${orderDetails.quantity})::int`,

        totalRevenue: sql<string>`SUM(${orderDetails.totalPriceOrderDetail})`,
      })
      .from(orderDetails)

      .innerJoin(orders, eq(orderDetails.orderId, orders.id))

      .innerJoin(productItems, eq(orderDetails.productItemId, productItems.id))

      .innerJoin(products, eq(productItems.productId, products.id))

      .innerJoin(categories, eq(products.cateId, categories.id))

      .where(eq(orders.status, OrderStatus.COMPLETED))

      .groupBy(categories.id, categories.nameCate, categories.imageCate)

      .orderBy(desc(sql`SUM(${orderDetails.quantity})`));

    return result.map((item) => ({
      ...item,
      totalRevenue: Number(item.totalRevenue),
    }));
  }
}
