import { OrderDetail } from "../../orderdetail/model";
import { ICreateOrderForm, Order } from "../model";

export interface IOrderRepository {
  insertOrder(form: ICreateOrderForm): Promise<Order>;

  getAllOrder: () => Promise<Order[]>;
  getOrderDetail: (orderId: string) => Promise<OrderDetail[]>;

  getOrderByOrderId(orderId: string): Promise<Order>;
  getAllOrderByUserId(userId: string): Promise<Order[]>;
}
export interface IOrderService {
  createOrder(form: ICreateOrderForm): Promise<Order>;

  getAllOrder: () => Promise<Order[]>;
  getOrderDetail: (orderId: string) => Promise<OrderDetail[]>;

  getOrderByOrderId(orderId: string): Promise<Order>;
  getAllOrderByUserId(userId: string): Promise<Order[]>;
}
