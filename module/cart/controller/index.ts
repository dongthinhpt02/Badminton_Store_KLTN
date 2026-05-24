import Elysia from "elysia";
import { MdlFactory } from "../../../src/shared/interface";
import { AuthContext } from "../../../src/shared/middleware";
import { successResponse } from "../../../src/shared/utils/response";
import { ICartItemService } from "../../cartitem/interface";
import {
  createCartItemSchema,
  ICreateCartItemForm,
  updateCartItemSchema,
} from "../../cartitem/model";
import { ICartService } from "../interface";

export class HttpCartController {
  constructor(
    private cartService: ICartService,
    private cartItemService: ICartItemService,
  ) {}
  private async insertCartItem(ctx: AuthContext) {
    const form = createCartItemSchema.parse(ctx.body);
    const data = await this.cartItemService.create({
      ...form,
    });
    return successResponse(data, ctx);
  }
  private async updateCartItem(ctx: AuthContext) {
    const id = ctx.query.id;
    const form = updateCartItemSchema.parse(ctx.body);
    const data = await this.cartItemService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteCartItem(ctx: AuthContext) {
    const id = ctx.query.id;
    const data = await this.cartItemService.delete(id);
    return successResponse(data, ctx);
  }
  private async getCartItemById(ctx: AuthContext) {
    const id = ctx.query.id;
    const data = await this.cartItemService.getCartItemById(id);
    return successResponse(data, ctx);
  }
  private async getCartItemByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.cartItemService.getAllCartItemByUserId(userId);
    return successResponse(data, ctx);
  }
  private async tickCartItem(ctx: AuthContext) {
    const id = ctx.query.id;
    const data = await this.cartItemService.tickCartItem(id);
    return successResponse(data, ctx);
  }
  private async untickCartItem(ctx: AuthContext) {
    const id = ctx.query.id;
    const data = await this.cartItemService.untickCartItem(id);
    return successResponse(data, ctx);
  }

  private async getCartById(ctx: AuthContext) {
    const id = ctx.query.id;
    const data = await this.cartService.getCartById(id);
    return successResponse(data, ctx);
  }
  private async getCartByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.cartService.getCartByUserId(userId);

    return successResponse(data, ctx);
  }
  private async updateCartTotals(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.cartService.updateCartTotals(userId);

    return successResponse(data, ctx);
  }
  private async calculateTotalCart(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.cartService.calculateTotalFee(userId);

    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const cartRoute = new Elysia({ prefix: "/cart" })
      .derive(mdlFactory.auth)

      .post("/items/insert", this.insertCartItem.bind(this))
      .put("/items/update", this.updateCartItem.bind(this))
      .delete("/items/delete", this.deleteCartItem.bind(this))
      .put("/items/tick", this.tickCartItem.bind(this))
      .put("/items/untick", this.untickCartItem.bind(this))
      .get("/items/id", this.getCartItemById.bind(this))
      .get("/items", this.getCartItemByUserId.bind(this))

      .get("/id", this.getCartById.bind(this))
      .get("/", this.getCartByUserId.bind(this))
      .put("/updatetotal", this.updateCartTotals.bind(this))
      .post("/calculate-total-cart", this.calculateTotalCart.bind(this));
    return cartRoute;
  }
}
