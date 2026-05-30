import { OrderDetail } from "../../orderdetail/model";
import { ICreateOrderForm, Order } from "../model";

export interface IOrderRepository {
  insertOrder(form: ICreateOrderForm): Promise<Order>;

  getAllOrder: () => Promise<Order[]>;
  getOrderDetail: (orderId: string) => Promise<OrderDetail[]>;
  getAllOrderProcessing(): Promise<Order[]>;
  getAllOrderDelivered(): Promise<Order[]>;
  getAllOrderCompleted(): Promise<Order[]>;
  getAllOrderCancelled(): Promise<Order[]>;
  getAllOrderProcessingByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]>;
  getAllOrderDeliveredByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]>;
  getAllOrderCompletedByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]>;
  getAllOrderCancelledByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]>;

  getOrderByOrderId(orderId: string): Promise<Order>;
  CancelledOrderAdmin(orderId: string): Promise<Order>;
  TakeOrderDeliveredAdmin(orderId: string): Promise<Order>;

  //user
  getAllOrderByUserId(userId: string): Promise<Order[]>;
  getDetailOrderByOrderId(orderId: string): Promise<OrderDetail[]>;
  getOrderProcessingByUserId(userId: string): Promise<Order[]>;
  getOrderDeliveredByUserId(userId: string): Promise<Order[]>;
  getOrderCompletedByUserId(userId: string): Promise<Order[]>;
  getOrderCancelledByUserId(userId: string): Promise<Order[]>;
  takeOrderCompletedByUserId(id: string, userId: string): Promise<Order[]>;

  //statistic
  generalStatistic(): Promise<any>;
  statisticByStatus(): Promise<any>;
  statisticByTime(): Promise<any>;
  getTopSellingProductItem(): Promise<any>;
  getBrandStatistics(): Promise<any>;
  getCategoryStatistics(): Promise<any>;
}
export interface IOrderService {
  // createOrder(form: ICreateOrderForm): Promise<Order>;
  //admin
  getAllOrder: () => Promise<Order[]>;
  getOrderDetail: (orderId: string) => Promise<OrderDetail[]>;

  getAllOrderProcessing(): Promise<Order[]>;
  getAllOrderDelivered(): Promise<Order[]>;
  getAllOrderCompleted(): Promise<Order[]>;
  getAllOrderCancelled(): Promise<Order[]>;
  getAllOrderProcessingByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]>;
  getAllOrderDeliveredByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]>;
  getAllOrderCompletedByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]>;
  getAllOrderCancelledByTime(
    startDate: string,
    endDate: string,
  ): Promise<Order[]>;
  getOrderByOrderId(orderId: string): Promise<Order>;
  CancelledOrderAdmin(orderId: string): Promise<Order>;
  TakeOrderDeliveredAdmin(orderId: string): Promise<Order>;
  //user
  getAllOrderByUserId(userId: string): Promise<Order[]>;
  getDetailOrderByOrderId(orderId: string): Promise<OrderDetail[]>;
  getOrderProcessingByUserId(userId: string): Promise<Order[]>;
  getOrderDeliveredByUserId(userId: string): Promise<Order[]>;
  getOrderCompletedByUserId(userId: string): Promise<Order[]>;
  getOrderCancelledByUserId(userId: string): Promise<Order[]>;
  takeOrderCompletedByUserId(id: string, userId: string): Promise<Order[]>;

  //statistic
  generalStatistic(): Promise<any>;
  statisticByStatus(): Promise<any>;
  statisticByTime(): Promise<any>;
  getTopSellingProductItem(): Promise<any>;
  getBrandStatistics(): Promise<any>;
  getCategoryStatistics(): Promise<any>;
}
