import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "../../../src/shared/common/neon/schema/userSchema";

export interface IAuthen {
  access_token: string;
  refresh_token: string;
}
import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  fullname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),

  created_at: z.date(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  restored_at: z.date().nullable(),

  status: z.enum(["active", "inactive"]).default("active"),
  role: z.enum(["user", "admin", "manager"]).default("user"),

  email_verify_token: z.string().nullable().optional(),
  forgot_password_token: z.string().nullable().optional(),

  bio: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),

  to_province: z.number().int().nullable().optional(),
  to_district: z.number().int().nullable().optional(),
  to_ward: z.string().nullable().optional(),
  to_address: z.string().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
export const loginSchema = userSchema
  .pick({
    email: true,
    password: true,
  })
  .required();
export type ILoginForm = z.infer<typeof loginSchema>;
// Sign up
export const signupSchema = userSchema
  .pick({
    fullname: true,
    email: true,
    password: true,
    username: true,
  })
  .required();

export type ISignupForm = z.infer<typeof signupSchema>;
// Update
export const updateUserSchema = userSchema
  .pick({
    fullname: true,
    password: true,
    role: true,
    status: true,
    email_verify_token: true,
    forgot_password_token: true,
    bio: true,
    avatar: true,
  })
  .partial();

export const updateProfileSchema = updateUserSchema
  .omit({
    role: true,
    status: true,
  })
  .partial();

export type IUpdateProfileForm = z.infer<typeof updateProfileSchema>;

export type IUpdateUserForm = z.infer<typeof updateUserSchema>;
// Query
export const userCondSchema = userSchema
  .pick({
    id: true,
    fullname: true,
    email: true,
    password: true,
    username: true,
    status: true,
  })
  .partial();

export type IUserCondForm = z.infer<typeof userCondSchema>;

export const resetPassowrdSchema = userSchema
  .pick({
    email: true,
  })
  .required();
export type IResetPasswordForm = z.infer<typeof resetPassowrdSchema>;

export const changePasswordSchema = userSchema
  .pick({
    password: true,
  })
  .required();
export type IChangePasswordForm = z.infer<typeof changePasswordSchema>;

export const refreshToken = z.object({
  refreshTokenId: z.string().uuid(),
  Token: z.string(),
});

export const updateAddressSchema = userSchema
  .pick({
    to_province: true,
    to_district: true,
    to_ward: true,
    to_address: true,
  })
  .partial();
export type IUpdateAddressForm = z.infer<typeof updateAddressSchema>;
