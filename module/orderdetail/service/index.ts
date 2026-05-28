import { ICreateBrandForm } from "../../brand/model";
import { IOrderDetailRepository, IOrderDetailService } from "../interface";
import { ICreateOrderDetail, OrderDetail } from "../model";

export class OrderDetailService implements IOrderDetailService {
  constructor(private readonly orderDetailRepo: IOrderDetailRepository) {}

  async createOrderDetail(form: ICreateOrderDetail): Promise<OrderDetail> {
    return await this.orderDetailRepo.insertOrderDetail(form);
  }
  async getOrderDetailByOrderId(orderId: string): Promise<OrderDetail[]> {
    return await this.orderDetailRepo.getOrderDetailByOrderId(orderId);
  }
}
