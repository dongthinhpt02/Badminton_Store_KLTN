import Elysia, { Context } from "elysia";
import { IUserService } from "../interface";
import {
  changePasswordSchema,
  loginSchema,
  resetPassowrdSchema,
  signupSchema,
  updateAddressSchema,
  updateUserSchema,
} from "../model";
import { successResponse } from "../../../src/shared/utils/response";
import { z } from "zod";
import { MdlFactory, TokenType } from "../../../src/shared/interface";
import { AuthContext } from "../../../src/shared/middleware";
import { ErrTokenInvalid } from "../../../src/shared/utils/error";
import { sendResetPasswordEmail } from "../../../src/shared/utils/mailer";
import appConfig from "../../../src/shared/common/config";
import logger from "../../../src/shared/utils/logger";
import { googleLoginSchema } from "../model/google";
import { sendResetPasswordEmailResend } from "../../../src/shared/utils/mailerResend";

export class HttpUserController {
  constructor(private readonly service: IUserService) {}
  private async login(ctx: Context) {
    const form = loginSchema.parse(ctx.body);
    const data = await this.service.login(form);

    return successResponse(data, ctx);
  }

  private async signup(ctx: Context) {
    try {
      const form = signupSchema.parse(ctx.body);
      const data = await this.service.signup(form);

      return successResponse(data, ctx);
    } catch (err) {
      // Xử lý lỗi Zod
      if (err instanceof z.ZodError) {
        return new Response(
          JSON.stringify({
            error: "Validation failed",
            // details: err.errors,
          }),
          { status: 400 },
        );
      }
      throw err;
    }
  }
  private async logout(ctx: AuthContext) {
    const token = ctx.token;
    if (ctx.decoded.type !== TokenType.RefreshToken)
      throw ErrTokenInvalid.withLog("Not the expected token");

    const data = await this.service.logout(token);

    return successResponse(data, ctx);
  }
  private async renewToken(ctx: AuthContext) {
    const token = ctx.token;
    if (ctx.decoded.type !== TokenType.RefreshToken)
      throw ErrTokenInvalid.withLog("Not the expected token");

    const data = await this.service.renewToken(token);

    return successResponse(data, ctx);
  }
  private async updateUser(ctx: AuthContext) {
    const user_id = ctx.decoded.sub;
    const form = updateUserSchema.parse(ctx.body);
    const data = await this.service.updateUser(user_id, form);

    return successResponse(data, ctx);
  }
  private async updateAddress(ctx: AuthContext) {
    const user_id = ctx.decoded.sub;
    const form = updateAddressSchema.parse(ctx.body);
    const data = await this.service.updateAddress(user_id, form);

    return successResponse(data, ctx);
  }
  private async getProfile(ctx: AuthContext) {
    const user_id = ctx.decoded.sub;
    const data = await this.service.getProfile(user_id);

    return successResponse(data, ctx);
  }
  private async sendEmailToResetPassword(ctx: Context) {
    try {
      const email = resetPassowrdSchema.parse(ctx.body);

      const data = await this.service.sendEmailToResetPassword(email);

      const resetUrl = `https://badminton-accessories.vercel.app/reset-password?token=${data}`;

      // await sendResetPasswordEmail(email.email, resetUrl);

      console.log("USE RESEND");
      await sendResetPasswordEmailResend(email.email, resetUrl);

      return successResponse(data, ctx);
    } catch (err) {
      console.error("RESET PASSWORD ERROR:", err);
      throw err;
    }
  }
  private async resetPassword(ctx: Context) {
    const token = ctx.query.token;
    logger.success(token);
    const form = changePasswordSchema.parse(ctx.body);
    const data = await this.service.changePassword(token, form);
    return successResponse(data, ctx);
  }
  private async googleLogin(ctx: Context) {
    const body = googleLoginSchema.parse(ctx.body);

    const data = await this.service.googleLogin(body.credential);

    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const module = new Elysia();
    const usersRoute = new Elysia({ prefix: "/user" })
      .post("/login", this.login.bind(this))
      .post("/signup", this.signup.bind(this))
      .post("/request-reset-password", this.sendEmailToResetPassword.bind(this))
      .post("/reset-password", this.resetPassword.bind(this))

      .post("/login/google", this.googleLogin.bind(this))

      .derive(mdlFactory.auth)
      .get("/renew", this.renewToken.bind(this))
      .delete("/logout", this.logout.bind(this))
      .get("/profile", this.getProfile.bind(this))
      .put("/update", this.updateUser.bind(this))
      .put("/update/address", this.updateAddress.bind(this));

    module.use(usersRoute);
    return module;
  }
}
