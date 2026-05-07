import Elysia, { Context } from "elysia";
import { successResponse } from "../../../src/shared/utils/response";
import { IPromotionService } from "../interface";
import { MdlFactory } from "../../../src/shared/interface";

export class HttpPromotionController {
  constructor(private service: IPromotionService) {}
  private async getById(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.service.getById(id);
    return successResponse(data, ctx);
  }
  private async getByName(ctx: Context) {
    const codePromotion = ctx.query.codePromotion;
    const data = await this.service.getByName(codePromotion);
    return successResponse(data, ctx);
  }
  private async getAllActive(ctx: Context) {
    const data = await this.service.getAllPromotionActive();
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const sizeTypeRoute = new Elysia({ prefix: "/promotion" })
      // .derive(mdlFactory.auth)
      .get("", this.getAllActive.bind(this))
      .get("/id", this.getById.bind(this))
      .get("/name", this.getByName.bind(this));
    return sizeTypeRoute;
  }
}
