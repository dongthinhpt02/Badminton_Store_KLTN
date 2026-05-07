import Elysia, { Context } from "elysia";
import { ICateService } from "../interface";
import { successResponse } from "../../../src/shared/utils/response";
import { MdlFactory } from "../../../src/shared/interface";

export class HttpCategoryController {
  constructor(private service: ICateService) {}
  private async getById(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const data = await this.service.getById(id);
    return successResponse(data, ctx);
  }
  private async getByName(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const nameCate = ctx.query.nameCate;
    const data = await this.service.getByName(nameCate);
    return successResponse(data, ctx);
  }
  private async getAllCateActive(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const data = await this.service.getAllCateActive();
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const usersRoute = new Elysia({ prefix: "/cate" })
      // .derive(mdlFactory.auth)
      .get("", this.getAllCateActive.bind(this))
      .get("/id", this.getById.bind(this))
      .get("/name", this.getByName.bind(this));
    return usersRoute;
  }
}
