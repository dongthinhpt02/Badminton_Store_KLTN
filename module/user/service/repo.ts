import { StringValue } from "ms";
import appConfig from "../../../src/shared/common/config";
import { TokenType, UserRole } from "../../../src/shared/interface";
import { IUserRepository } from "../interface";
import jwt from "../../../src/shared/common/jwt";
import { ISignupForm, IUpdateUserForm, IUserCondForm, User } from "../model";
import { db } from "../../../src/shared/common/neon/index";
import { users } from "../../../src/shared/common/neon/schema/userSchema";
import { eq, and } from "drizzle-orm";

export class UserRepo implements IUserRepository {
  async generateToken(
    userId: string,
    type: TokenType,
    expiresIn: StringValue,
  ): Promise<string> {
    return jwt.generateToken({
      payload: { sub: userId, role: UserRole.USER, type },
      options: { expiresIn: expiresIn ?? appConfig.jwt.accessTokenExpiresIn },
    });
  }
  async generateTokenAdmin(
    userId: string,
    type: TokenType,
    expiresIn: StringValue,
  ): Promise<string> {
    return jwt.generateToken({
      payload: { sub: userId, role: UserRole.ADMIN, type },
      options: { expiresIn: expiresIn ?? appConfig.jwt.accessTokenExpiresIn },
    });
  }
  async generateTokenManager(
    userId: string,
    type: TokenType,
    expiresIn: StringValue,
  ): Promise<string> {
    return jwt.generateToken({
      payload: { sub: userId, role: UserRole.MANAGER, type },
      options: { expiresIn: expiresIn ?? appConfig.jwt.accessTokenExpiresIn },
    });
  }
  async findById(id: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] ?? null;
  }
  async findByCond(cond: IUserCondForm): Promise<User | null> {
    const conditions = [];

    if (cond.email) conditions.push(eq(users.email, cond.email));
    if (cond.username) conditions.push(eq(users.username, cond.username));
    if (cond.password) conditions.push(eq(users.password, cond.password));

    const result = await db
      .select()
      .from(users)
      .where(conditions.length ? and(...conditions) : undefined)
      .limit(1);

    return result[0] ?? null;
  }

  async insert(user: ISignupForm): Promise<User> {
    const result = await db.insert(users).values(user).returning();

    return result[0];
  }
  async update(id: string, form: IUpdateUserForm): Promise<boolean> {
    const result = await db
      .update(users)
      .set({
        ...form,
        updated_at: new Date(), // nên update timestamp luôn
      })
      .where(eq(users.id, id))
      .returning({ id: users.id });

    return result.length > 0;
  }
}
