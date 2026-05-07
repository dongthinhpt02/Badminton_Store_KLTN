import Elysia, { Context } from "elysia";
import { IBrandService } from "../interface";
import { successResponse } from "../../../src/shared/utils/response";
import { MdlFactory } from "../../../src/shared/interface";

export class HttpBrandController {
  constructor(private service: IBrandService) {}
  private async getById(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const data = await this.service.getById(id);
    return successResponse(data, ctx);
  }
  private async getByName(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const nameBrand = ctx.query.nameBrand;
    const data = await this.service.getByName(nameBrand);
    return successResponse(data, ctx);
  }
  private async getAllCateActive(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const data = await this.service.getAllBrandActive();
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const usersRoute = new Elysia({ prefix: "/brand" })
      // .derive(mdlFactory.auth)
      .get("", this.getAllCateActive.bind(this))
      .get("/id", this.getById.bind(this))
      .get("/name", this.getByName.bind(this));
    return usersRoute;
  }
}
