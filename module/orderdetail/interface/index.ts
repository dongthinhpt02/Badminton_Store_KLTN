import { ICreateOrderDetail, OrderDetail } from "../model";

export interface IOrderDetailRepository {
  insertOrderDetail(form: ICreateOrderDetail): Promise<OrderDetail>;
  getOrderDetailByOrderId(orderId: string): Promise<OrderDetail[]>;
}
export interface IOrderDetailService {
  createOrderDetail(form: ICreateOrderDetail): Promise<OrderDetail>;
  getOrderDetailByOrderId(orderId: string): Promise<OrderDetail[]>;
}
