import Elysia, { Context } from "elysia";
import { successResponse } from "../../../src/shared/utils/response";
import { ISizeService } from "../interface";
import { MdlFactory } from "../../../src/shared/interface";

export class HttpSizeController {
  constructor(private service: ISizeService) {}
  private async getById(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.service.getById(id);
    return successResponse(data, ctx);
  }
  private async getByName(ctx: Context) {
    const name = ctx.query.nameSize;
    const data = await this.service.getByName(name);
    return successResponse(data, ctx);
  }
  private async getAllActive(ctx: Context) {
    const data = await this.service.getAllActive();
    return successResponse(data, ctx);
  }
  private async getSizeBySizeTypeId(ctx: Context) {
    const sizeTypeId = ctx.query.sizeTypeId;
    const data = await this.service.getSizeBySizeTypeId(sizeTypeId);
    return successResponse(data, ctx);
  }
  private async getSizeBySizeTypeName(ctx: Context) {
    const sizeTypeName = ctx.query.sizeTypeName;
    const data = await this.service.getSizeBySizeTypeName(sizeTypeName);
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const sizeRoute = new Elysia({ prefix: "/size" })
      // .derive(mdlFactory.auth)
      .get("", this.getAllActive.bind(this))
      .get("/id", this.getById.bind(this))
      .get("/name", this.getByName.bind(this))
      .get("/sizetype/id", this.getSizeBySizeTypeId.bind(this))
      .get("/sizetype/name", this.getSizeBySizeTypeName.bind(this));
    return sizeRoute;
  }
}
