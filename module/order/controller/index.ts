import Elysia from "elysia";
import { MdlFactory } from "../../../src/shared/interface";
import { AuthContext } from "../../../src/shared/middleware";
import { successResponse } from "../../../src/shared/utils/response";
import { IOrderService } from "../interface";

export class HttpOrderController {
  constructor(private readonly orderService: IOrderService) {}

  private async getAllOrderByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    console.log("User ID from token:", userId);
    const data = await this.orderService.getAllOrderByUserId(userId);
    return successResponse(data, ctx);
  }
  private async getDetailOrderByOrderId(ctx: AuthContext) {
    const orderId = ctx.query.orderId;
    const data = await this.orderService.getDetailOrderByOrderId(orderId);
    return successResponse(data, ctx);
  }
  private async getOrderProcessingByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.orderService.getOrderProcessingByUserId(userId);
    return successResponse(data, ctx);
  }
  private async getOrderDeliveredByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.orderService.getOrderDeliveredByUserId(userId);
    return successResponse(data, ctx);
  }
  private async getOrderCompletedByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.orderService.getOrderCompletedByUserId(userId);
    return successResponse(data, ctx);
  }
  private async getOrderCancelledByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.orderService.getOrderCancelledByUserId(userId);
    return successResponse(data, ctx);
  }
  private async takeOrderCompletedByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const id = ctx.query.id;
    const data = await this.orderService.takeOrderCompletedByUserId(id, userId);
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const orderRoute = new Elysia({ prefix: "/order" })
      .derive(mdlFactory.auth)
      .get("/all-order", this.getAllOrderByUserId.bind(this))
      .get("/detail", this.getDetailOrderByOrderId.bind(this))
      .get("/all-order-processing", this.getOrderProcessingByUserId.bind(this))
      .get("/all-order-delivered", this.getOrderDeliveredByUserId.bind(this))
      .get("/all-order-completed", this.getOrderCompletedByUserId.bind(this))
      .get("/all-order-cancelled", this.getOrderCancelledByUserId.bind(this))
      .post(
        "/take-order-completed",
        this.takeOrderCompletedByUserId.bind(this),
      );

    return orderRoute;
  }
}
