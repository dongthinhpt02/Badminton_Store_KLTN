import Elysia from "elysia";
import { MdlFactory } from "../../../src/shared/interface";
import { AuthContext } from "../../../src/shared/middleware";
import { successResponse } from "../../../src/shared/utils/response";
import { IConservationService } from "../interface";
import { sendMessageSchema } from "../model";

export class HttpConservationController {
  constructor(private conservationService: IConservationService) {}
  private async createConservation(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.conservationService.createConservation(userId);
    return successResponse(data, ctx);
  }
  private async getConservationById(ctx: AuthContext) {
    const id = ctx.query.conservationId;
    const data = await this.conservationService.getConservationById(id);
    return successResponse(data, ctx);
  }
  private async getConservationByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.conservationService.getConservationByUserId(userId);
    return successResponse(data, ctx);
  }
  private async sendMessage(ctx: AuthContext) {
    const senderId = ctx.decoded.sub;
    const conservationId = ctx.query.conservationId;

    const form = sendMessageSchema.parse(ctx.body);

    const data = await this.conservationService.sendMessage(
      conservationId,
      senderId,
      "user",
      form.content,
    );

    return successResponse(data, ctx);
  }
  private async getMessages(ctx: AuthContext) {
    const conservationId = ctx.query.conservationId;
    const data = await this.conservationService.getMessages(conservationId);
    return successResponse(data, ctx);
  }
  private async closeConservation(ctx: AuthContext) {
    const conservationId = ctx.query.conservationId;
    const data =
      await this.conservationService.closeConservation(conservationId);
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const module = new Elysia({ prefix: "/conservation" })
      .derive(mdlFactory.auth)
      .post("/create", this.createConservation.bind(this))
      .get("/by-id", this.getConservationById.bind(this))
      .get("/by-user-id", this.getConservationByUserId.bind(this))
      .post("/send-message", this.sendMessage.bind(this))
      .get("/messages", this.getMessages.bind(this))
      .post("/close", this.closeConservation.bind(this));

    return module;
  }
}
