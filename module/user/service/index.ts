import appConfig from "../../../src/shared/common/config";
import { hashPassword } from "../../../src/shared/common/hash";
import jwt from "../../../src/shared/common/jwt";
import { db } from "../../../src/shared/common/neon/index";
import { refreshToken } from "../../../src/shared/common/neon/schema/refreshTokenSchema";
import { users } from "../../../src/shared/common/neon/schema/userSchema";
import { cart } from "../../../src/shared/common/neon/schema/cartSchema";
import { ITokenPayload, TokenType } from "../../../src/shared/interface";
import { AppError } from "../../../src/shared/utils/error";
import { IUserRepository, IUserService } from "../interface";
import {
  IAuthen,
  IChangePasswordForm,
  ILoginForm,
  IResetPasswordForm,
  ISignupForm,
  IUpdateAddressForm,
  IUpdateUserForm,
  signupSchema,
  User,
} from "../model";
import {
  ErrEmailAndUsernameExisted,
  ErrEmailNotFound,
  ErrInvalidEmailAndPassword,
  ErrUserInactivated,
} from "../model/error";
import { eq, or, and } from "drizzle-orm";
import { StringValue } from "ms";
import { OAuth2Client } from "google-auth-library";
import { googleClient } from "../../../src/shared/common/google";

export class UserService implements IUserService {
  constructor(private repository: IUserRepository) {}

  async login(form: ILoginForm): Promise<IAuthen> {
    const hashedPassword = hashPassword(form.password);

    const user = await this.repository.findByCond({
      email: form.email,
      password: hashedPassword,
    });

    if (!user) {
      throw AppError.from(ErrInvalidEmailAndPassword, 400);
    }

    if (user.status !== "active") {
      throw AppError.from(ErrUserInactivated, 400).withLog(
        "Account is not active",
      );
    }

    // 🧠 map role → function (clean hơn if-else spam)
    const tokenStrategy = {
      admin: this.repository.generateTokenAdmin,
      manager: this.repository.generateTokenManager,
      user: this.repository.generateToken,
    } as const;

    const generateTokenFn =
      tokenStrategy[user.role as keyof typeof tokenStrategy] ??
      this.repository.generateToken;

    const [access_token, refresh_token] = await Promise.all([
      generateTokenFn.call(
        this.repository,
        user.id,
        TokenType.AccessToken,
        appConfig.jwt.accessTokenExpiresIn,
      ),
      generateTokenFn.call(
        this.repository,
        user.id,
        TokenType.RefreshToken,
        appConfig.jwt.refreshTokenExpiresIn,
      ),
    ]);

    // 💾 lưu refresh token (Postgre)
    await db.insert(refreshToken).values({
      token: refresh_token,
    });

    if (user.role === "user") {
      const checkCart = await db
        .select()
        .from(cart)
        .where(eq(cart.userId, user.id))
        .limit(1);

      if (checkCart.length === 0) {
        await db.insert(cart).values({
          userId: user.id,
          totalPrice: 0,
          totalQuantity: 0,
        });
      }
    }
    if (user.role !== "admin") {
      const findUserSendBird = await fetch(
        `https://api-${appConfig.SENDBIRD.applicationId}.sendbird.com/v3/users/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Api-Token": appConfig.SENDBIRD.apiToken,
          },
        },
      );

      console.log("SendBird find user response:", findUserSendBird.status);
      if (findUserSendBird.status !== 404) {
        const body = JSON.stringify({
          user_id: user.id,
          nickname: user.fullname,
          profile_url: "",
          profile_file: null,
          metadata: {
            font_preference: "times new roman",
            font_color: "black",
            role: user.role,
          },
        });

        const sendBirdCreateUser = await fetch(
          `https://api-${appConfig.SENDBIRD.applicationId}.sendbird.com/v3/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Api-Token": appConfig.SENDBIRD.apiToken,
            },
            body: body,
          },
        );

        const data = await sendBirdCreateUser.json();
        console.log("SendBird create user response:", data);
      }
    }

    return {
      access_token,
      refresh_token,
    };
  }
  async signup(form: ISignupForm): Promise<IAuthen> {
    console.log("👉 start signup");

    const newUser = signupSchema.parse(form);

    console.log("👉 before query");

    // const existingUser = await db
    //   .select()
    //   .from(users)
    //   .where(
    //     or(
    //       eq(users.email, newUser.email),
    //       eq(users.username, newUser.username),
    //     ),
    //   )
    //   .limit(1);
    const existingUser = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, newUser.email),
          eq(users.username, newUser.username),
        ),
      )
      .limit(1);

    console.log("👉 after query");
    if (existingUser.length > 0) {
      throw AppError.from(ErrEmailAndUsernameExisted, 400);
    }
    console.log("👉 checked existing");

    const hashedPassword = hashPassword(newUser.password);

    // ❌ bỏ transaction
    const inserted = await db
      .insert(users)
      .values({
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
        password: hashedPassword,
        status: "active",
        role: "user",
      })
      .returning();

    console.log("👉 inserted user");

    const user = inserted[0];

    const [access_token, refresh_token] = await Promise.all([
      this.repository.generateToken(
        user.id,
        TokenType.AccessToken,
        appConfig.jwt.accessTokenExpiresIn,
      ),
      this.repository.generateToken(
        user.id,
        TokenType.RefreshToken,
        appConfig.jwt.refreshTokenExpiresIn,
      ),
    ]);

    await db.insert(refreshToken).values({
      token: refresh_token,
    });
    await db.insert(cart).values({
      userId: user.id,
      totalPrice: 0,
      totalQuantity: 0,
    });
    console.log("👉 inserted token");

    const body = JSON.stringify({
      user_id: user.id,
      nickname: user.fullname,
      profile_url: "",
      profile_file: null,
      metadata: {
        font_preference: "times new roman",
        font_color: "black",
        role: user.role,
      },
    });

    const sendBirdCreateUser = await fetch(
      `https://api-${appConfig.SENDBIRD.applicationId}.sendbird.com/v3/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Token": appConfig.SENDBIRD.apiToken,
        },
        body: body,
      },
    );

    const data = await sendBirdCreateUser.json();
    console.log("SendBird create user response:", data);

    return {
      access_token,
      refresh_token,
    };
  }

  async signupAdmin(form: ISignupForm): Promise<IAuthen> {
    console.log("👉 start signup");

    const newUser = signupSchema.parse(form);

    console.log("👉 before query");

    // const existingUser = await db
    //   .select()
    //   .from(users)
    //   .where(
    //     or(
    //       eq(users.email, newUser.email),
    //       eq(users.username, newUser.username),
    //     ),
    //   )
    //   .limit(1);
    const existingUser = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, newUser.email),
          eq(users.username, newUser.username),
        ),
      )
      .limit(1);

    console.log("👉 after query");
    if (existingUser.length > 0) {
      throw AppError.from(ErrEmailAndUsernameExisted, 400);
    }
    console.log("👉 checked existing");

    const hashedPassword = hashPassword(newUser.password);

    // ❌ bỏ transaction
    const inserted = await db
      .insert(users)
      .values({
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
        password: hashedPassword,
        status: "active",
        role: "admin",
      })
      .returning();

    console.log("👉 inserted admin");

    const user = inserted[0];

    const [access_token, refresh_token] = await Promise.all([
      this.repository.generateTokenAdmin(
        user.id,
        TokenType.AccessToken,
        appConfig.jwt.accessTokenExpiresIn,
      ),
      this.repository.generateTokenAdmin(
        user.id,
        TokenType.RefreshToken,
        appConfig.jwt.refreshTokenExpiresIn,
      ),
    ]);

    await db.insert(refreshToken).values({
      token: refresh_token,
    });
    // await db.insert(cart).values({
    //   userId: user.id,
    //   totalPrice: 0,
    //   totalQuantity: 0,
    // });
    console.log("👉 inserted token");

    return {
      access_token,
      refresh_token,
    };
  }
  async signupManager(form: ISignupForm): Promise<IAuthen> {
    console.log("👉 start signup");

    const newUser = signupSchema.parse(form);

    console.log("👉 before query");

    // const existingUser = await db
    //   .select()
    //   .from(users)
    //   .where(
    //     or(
    //       eq(users.email, newUser.email),
    //       eq(users.username, newUser.username),
    //     ),
    //   )
    //   .limit(1);
    const existingUser = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, newUser.email),
          eq(users.username, newUser.username),
        ),
      )
      .limit(1);

    console.log("👉 after query");
    if (existingUser.length > 0) {
      throw AppError.from(ErrEmailAndUsernameExisted, 400);
    }
    console.log("👉 checked existing");

    const hashedPassword = hashPassword(newUser.password);

    // ❌ bỏ transaction
    const inserted = await db
      .insert(users)
      .values({
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
        password: hashedPassword,
        status: "active",
        role: "manager",
      })
      .returning();

    console.log("👉 inserted manager");

    const user = inserted[0];

    const [access_token, refresh_token] = await Promise.all([
      this.repository.generateTokenManager(
        user.id,
        TokenType.AccessToken,
        appConfig.jwt.accessTokenExpiresIn,
      ),
      this.repository.generateTokenManager(
        user.id,
        TokenType.RefreshToken,
        appConfig.jwt.refreshTokenExpiresIn,
      ),
    ]);

    await db.insert(refreshToken).values({
      token: refresh_token,
    });
    // await db.insert(cart).values({
    //   userId: user.id,
    //   totalPrice: 0,
    //   totalQuantity: 0,
    // });
    console.log("👉 inserted token");

    return {
      access_token,
      refresh_token,
    };
  }

  async logout(token: string): Promise<boolean> {
    const result = await db
      .delete(refreshToken)
      .where(eq(refreshToken.token, token))
      .returning();

    return result.length > 0;
  }

  async renewToken(oldRefreshToken: string): Promise<IAuthen> {
    const decoded = (await jwt.verifyToken(oldRefreshToken)) as ITokenPayload;

    // 🔑 generate token mới
    const [access_token, refresh_token] = await Promise.all([
      this.repository.generateToken(
        decoded.sub,
        TokenType.AccessToken,
        appConfig.jwt.accessTokenExpiresIn,
      ),
      this.repository.generateToken(
        decoded.sub,
        TokenType.RefreshToken,
        appConfig.jwt.refreshTokenExpiresIn,
      ),
    ]);

    // 💾 lưu refresh token mới
    await db.insert(refreshToken).values({
      token: refresh_token,
    });

    // 🧹 xoá token cũ
    await db
      .delete(refreshToken)
      .where(eq(refreshToken.token, oldRefreshToken));

    return {
      access_token,
      refresh_token,
    };
  }
  async renewTokenAdmin(oldRefreshToken: string): Promise<IAuthen> {
    const decoded = (await jwt.verifyToken(oldRefreshToken)) as ITokenPayload;

    // 🔑 generate token mới
    const [access_token, refresh_token] = await Promise.all([
      this.repository.generateTokenAdmin(
        decoded.sub,
        TokenType.AccessToken,
        appConfig.jwt.accessTokenExpiresIn,
      ),
      this.repository.generateTokenAdmin(
        decoded.sub,
        TokenType.RefreshToken,
        appConfig.jwt.refreshTokenExpiresIn,
      ),
    ]);

    // 💾 lưu refresh token mới
    await db.insert(refreshToken).values({
      token: refresh_token,
    });

    // 🧹 xoá token cũ
    await db
      .delete(refreshToken)
      .where(eq(refreshToken.token, oldRefreshToken));

    return {
      access_token,
      refresh_token,
    };
  }
  async renewTokenManager(oldRefreshToken: string): Promise<IAuthen> {
    const decoded = (await jwt.verifyToken(oldRefreshToken)) as ITokenPayload;

    // 🔑 generate token mới
    const [access_token, refresh_token] = await Promise.all([
      this.repository.generateTokenManager(
        decoded.sub,
        TokenType.AccessToken,
        appConfig.jwt.accessTokenExpiresIn,
      ),
      this.repository.generateTokenManager(
        decoded.sub,
        TokenType.RefreshToken,
        appConfig.jwt.refreshTokenExpiresIn,
      ),
    ]);

    // 💾 lưu refresh token mới
    await db.insert(refreshToken).values({
      token: refresh_token,
    });

    // 🧹 xoá token cũ
    await db
      .delete(refreshToken)
      .where(eq(refreshToken.token, oldRefreshToken));

    return {
      access_token,
      refresh_token,
    };
  }
  async updateUser(id: string, form: IUpdateUserForm): Promise<User> {
    const updated = await db
      .update(users)
      .set({ ...form, updated_at: new Date() })
      .where(eq(users.id, id))
      .returning();

    return updated[0];
  }
  async getProfile(id: string): Promise<User> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0];
  }
  async sendEmailToResetPassword(form: IResetPasswordForm): Promise<string> {
    const user = await this.repository.findByCond({
      email: form.email,
    });

    if (!user) {
      throw AppError.from(ErrEmailNotFound, 400).withLog("Email not found");
    }

    // 🧠 nếu đã có token thì reuse
    if (user.forgot_password_token) {
      return user.forgot_password_token;
    }

    // 🔑 generate token
    const token = await this.repository.generateToken(
      user.id, // ❗ PostgreSQL dùng id, không phải _id
      TokenType.ForgotPasswordToken,
      appConfig.jwt.resetPasswordTokenExpiresIn,
    );

    // 💾 update vào DB
    await db
      .update(users)
      .set({
        forgotPasswordToken: token,
        updated_at: new Date(),
      })
      .where(eq(users.id, user.id));

    return token;
  }
  async changePassword(
    token: string,
    form: IChangePasswordForm,
  ): Promise<boolean> {
    // 🔍 tìm user theo token
    const result = await db
      .select()
      .from(users)
      .where(eq(users.forgotPasswordToken, token))
      .limit(1);

    const user = result[0];

    if (!user) {
      return false;
    }

    // 🔐 update password + xoá token
    await db
      .update(users)
      .set({
        password: hashPassword(form.password),
        forgotPasswordToken: null,
        updated_at: new Date(),
      })
      .where(eq(users.id, user.id));

    return true;
  }
  async updateAddress(id: string, form: IUpdateAddressForm): Promise<User> {
    const result = await db
      .update(users)
      .set({
        ...form,
        updated_at: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return result[0];
  }
  async getAllUserAdmin(): Promise<User[]> {
    const result = await db.select().from(users).where(eq(users.role, "user"));

    return result as User[];
  }
  async getAllUserActiveAdmin(): Promise<User[]> {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.role, "user"), eq(users.status, "active")));

    return result as User[];
  }
  async getAllUserInactiveAdmin(): Promise<User[]> {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.role, "user"), eq(users.status, "inactive")));

    return result as User[];
  }
  async getAllManager(): Promise<User[]> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.role, "manager"));
    return result as User[];
  }
  async getAllManagerActiveAdmin(): Promise<User[]> {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.role, "manager"), eq(users.status, "active")));

    return result as User[];
  }
  async getAllManagerInactiveAdmin(): Promise<User[]> {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.role, "manager"), eq(users.status, "inactive")));

    return result as User[];
  }
  async getAllUserAndManagerAdmin(): Promise<User[]> {
    const result = await db
      .select()
      .from(users)
      .where(or(eq(users.role, "user"), eq(users.role, "manager")));

    return result as User[];
  }
  async lockUser(id: string): Promise<boolean> {
    const result = await db
      .update(users)
      .set({
        status: "inactive",
        updated_at: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return result.length > 0;
  }
  async unlockUser(id: string): Promise<boolean> {
    const result = await db
      .update(users)
      .set({
        status: "active",
        updated_at: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return result.length > 0;
  }
  async googleLogin(credential: string): Promise<IAuthen> {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: appConfig.google.googleClientId,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new Error("Google email not found");
    }

    let user = await this.repository.findByCond({
      email: payload.email,
    });

    if (user && user.status !== "active") {
      throw AppError.from(ErrUserInactivated, 400).withLog(
        "Account is not active",
      );
    }

    // chưa tồn tại thì tự tạo account
    if (!user) {
      const inserted = await db
        .insert(users)
        .values({
          fullname: payload.name ?? "",
          username:
            payload.email.split("@")[0] + Math.floor(Math.random() * 10000),

          email: payload.email,

          password: "",

          role: "user",
          status: "active",

          avatar: null,
        })
        .returning();

      user = inserted[0];

      await db.insert(cart).values({
        userId: user.id,
        totalPrice: 0,
        totalQuantity: 0,
      });
    }

    const [access_token, refresh_token] = await Promise.all([
      this.repository.generateToken(
        user.id,
        TokenType.AccessToken,
        appConfig.jwt.accessTokenExpiresIn,
      ),

      this.repository.generateToken(
        user.id,
        TokenType.RefreshToken,
        appConfig.jwt.refreshTokenExpiresIn,
      ),
    ]);

    await db.insert(refreshToken).values({
      token: refresh_token,
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
