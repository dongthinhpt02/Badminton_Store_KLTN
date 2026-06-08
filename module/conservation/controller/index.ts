import Elysia from "elysia";
import { MdlFactory } from "../../../src/shared/interface";
import { AuthContext } from "../../../src/shared/middleware";
import { successResponse } from "../../../src/shared/utils/response";
import { IConservationService } from "../interface";
import { sendMessageSchema } from "../model";

export class HttpConservationController {
  constructor(private conservationService: IConservationService) {}
  private async createConversation(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.conservationService.createConversation(userId);
    return successResponse(data, ctx);
  }
  private async getConversationById(ctx: AuthContext) {
    const id = ctx.query.conservationId;
    const data = await this.conservationService.getConversationById(id);
    return successResponse(data, ctx);
  }
  private async getConversationByUserId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data = await this.conservationService.getConversationByUserId(userId);
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
  private async closeConversation(ctx: AuthContext) {
    const conservationId = ctx.query.conservationId;
    const data =
      await this.conservationService.closeConversation(conservationId);
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const module = new Elysia({ prefix: "/conservation" })
      .derive(mdlFactory.auth)
      .post("/create", this.createConversation.bind(this))
      .get("/by-id", this.getConversationById.bind(this))
      .get("/by-user-id", this.getConversationByUserId.bind(this))
      .post("/send-message", this.sendMessage.bind(this))
      .get("/messages", this.getMessages.bind(this))
      .post("/close", this.closeConversation.bind(this));

    return module;
  }
}
