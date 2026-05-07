import Elysia, { Context } from "elysia";
import { successResponse } from "../../../src/shared/utils/response";
import { ISizeTypeService } from "../interface";
import { MdlFactory } from "../../../src/shared/interface";

export class HttpSizeTypeController {
  constructor(private service: ISizeTypeService) {}
  private async getById(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.service.getById(id);
    return successResponse(data, ctx);
  }
  private async getByName(ctx: Context) {
    const name = ctx.query.nameSizeType;
    const data = await this.service.getByName(name);
    return successResponse(data, ctx);
  }
  private async getAllActive(ctx: Context) {
    const data = await this.service.getAllActive();
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const sizeTypeRoute = new Elysia({ prefix: "/sizetype" })
      // .derive(mdlFactory.auth)
      .get("", this.getAllActive.bind(this))
      .get("/id", this.getById.bind(this))
      .get("/name", this.getByName.bind(this));
    return sizeTypeRoute;
  }
}
