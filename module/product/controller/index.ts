import Elysia, { Context } from "elysia";
import { IProductService } from "../interface";
import { successResponse } from "../../../src/shared/utils/response";
import { MdlFactory } from "../../../src/shared/interface";

export class HttpProductController {
  constructor(private readonly service: IProductService) {}
  private async getById(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.service.getById(id);
    return successResponse(data, ctx);
  }
  private async getByName(ctx: Context) {
    const name = ctx.query.nameProduct;
    const data = await this.service.getByName(name);
    return successResponse(data, ctx);
  }
  private async getAllActive(ctx: Context) {
    const data = await this.service.getAllProductActive();
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const sizeTypeRoute = new Elysia({ prefix: "/product" })
      // .derive(mdlFactory.auth)
      .get("", this.getAllActive.bind(this))
      .get("/id", this.getById.bind(this))
      .get("/name", this.getByName.bind(this));
    return sizeTypeRoute;
  }
}
