import { OrderDetail } from "../../orderdetail/model";
import { IOrderRepository, IOrderService } from "../interface";
import { Order } from "../model";

export class OrderService implements IOrderService {
  constructor(private readonly orderRepo: IOrderRepository) {}
  //admin
  async getAllOrder(): Promise<Order[]> {
    return await this.orderRepo.getAllOrder();
  }
  async getOrderDetail(orderId: string) {
    return await this.orderRepo.getOrderDetail(orderId);
  }
  async getOrderByOrderId(orderId: string): Promise<Order> {
    return await this.orderRepo.getOrderByOrderId(orderId);
  }
  async getAllOrderProcessing(): Promise<Order[]> {
    return await this.orderRepo.getAllOrderProcessing();
  }
  async getAllOrderDelivered(): Promise<Order[]> {
    return await this.orderRepo.getAllOrderDelivered();
  }
  async getAllOrderCompleted(): Promise<Order[]> {
    return await this.orderRepo.getAllOrderCompleted();
  }
  async getAllOrderCancelled(): Promise<Order[]> {
    return await this.orderRepo.getAllOrderCancelled();
  }
  async getAllOrderProcessingByTime(startDate: string, endDate: string) {
    return await this.orderRepo.getAllOrderProcessingByTime(startDate, endDate);
  }
  async getAllOrderDeliveredByTime(startDate: string, endDate: string) {
    return await this.orderRepo.getAllOrderDeliveredByTime(startDate, endDate);
  }
  async getAllOrderCompletedByTime(startDate: string, endDate: string) {
    return await this.orderRepo.getAllOrderCompletedByTime(startDate, endDate);
  }
  async getAllOrderCancelledByTime(startDate: string, endDate: string) {
    return await this.orderRepo.getAllOrderCancelledByTime(startDate, endDate);
  }
  async CancelledOrderAdmin(orderId: string): Promise<Order> {
    return await this.orderRepo.CancelledOrderAdmin(orderId);
  }
  async TakeOrderDeliveredAdmin(orderId: string): Promise<Order> {
    return await this.orderRepo.TakeOrderDeliveredAdmin(orderId);
  }
  //user
  async getAllOrderByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepo.getAllOrderByUserId(userId);
  }
  async getDetailOrderByOrderId(orderId: string): Promise<OrderDetail[]> {
    return await this.orderRepo.getDetailOrderByOrderId(orderId);
  }
  async getOrderProcessingByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepo.getOrderProcessingByUserId(userId);
  }
  async getOrderDeliveredByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepo.getOrderDeliveredByUserId(userId);
  }
  async getOrderCompletedByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepo.getOrderCompletedByUserId(userId);
  }
  async getOrderCancelledByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepo.getOrderCancelledByUserId(userId);
  }
  async takeOrderCompletedByUserId(
    id: string,
    userId: string,
  ): Promise<Order[]> {
    return await this.orderRepo.takeOrderCompletedByUserId(id, userId);
  }
  async generalStatistic(): Promise<any> {
    return await this.orderRepo.generalStatistic();
  }

  async statisticByStatus(): Promise<any> {
    return await this.orderRepo.statisticByStatus();
  }

  async statisticByTime(): Promise<any> {
    return await this.orderRepo.statisticByTime();
  }

  async getTopSellingProductItem(): Promise<any> {
    return await this.orderRepo.getTopSellingProductItem();
  }

  async getBrandStatistics(): Promise<any> {
    return await this.orderRepo.getBrandStatistics();
  }

  async getCategoryStatistics(): Promise<any> {
    return await this.orderRepo.getCategoryStatistics();
  }
}
