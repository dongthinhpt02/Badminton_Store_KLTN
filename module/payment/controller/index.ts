import Elysia, { Context } from "elysia";
import { IPaymentService } from "../interface";
import { successResponse } from "../../../src/shared/utils/response";
import { MdlFactory } from "../../../src/shared/interface";
import { AuthContext } from "../../../src/shared/middleware";

export class HttpPaymentController {
  constructor(private readonly paymentService: IPaymentService) {}
  private async getById(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.paymentService.getById(id);
    return successResponse(data, ctx);
  }
  private async getByName(ctx: Context) {
    const name = ctx.query.namePayment;
    const data = await this.paymentService.getByName(name);
    return successResponse(data, ctx);
  }
  private async getAllActive(ctx: Context) {
    const data = await this.paymentService.getAllPaymentActive();
    return successResponse(data, ctx);
  }

  private async VNPayPayment(ctx: AuthContext) {
    const id = ctx.decoded.sub;
    const payload = ctx.body as {
      amount: number;
    };
    const data = await this.paymentService.VNPayPayment(id, payload);
    return successResponse(data, ctx);
  }
  private async AfterVNPayPayment(ctx: AuthContext) {
    const userId = ctx.decoded.sub;

    const phonenumber = ctx.query.phonenumber as string;

    const vnParams = ctx.query;

    const data = await this.paymentService.AfterVNPayPayment(
      userId,
      phonenumber,
      vnParams,
    );

    return successResponse(data, ctx);
  }
  private async CODPayment(ctx: AuthContext) {
    const id = ctx.decoded.sub;
    const phonenumber = ctx.query.phonenumber as string;
    const data = await this.paymentService.CODPayment(id, phonenumber);
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const productRoute = new Elysia({ prefix: "/payment" })
      .derive(mdlFactory.auth)
      .get("", this.getAllActive.bind(this))
      .get("/id", this.getById.bind(this))
      .get("/name", this.getByName.bind(this))
      .post("/vnpay", this.VNPayPayment.bind(this))
      .get("/vnpay/return", this.AfterVNPayPayment.bind(this))
      .post("/cod", this.CODPayment.bind(this));

    return productRoute;
  }
}
