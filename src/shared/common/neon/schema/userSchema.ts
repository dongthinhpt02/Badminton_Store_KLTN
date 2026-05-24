import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  date,
  integer,
} from "drizzle-orm/pg-core";

// // ENUMS
// export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN", "MANAGER"]);

// export const userStatusEnum = pgEnum("user_status", ["ACTIVE", "INACTIVE"]);

// TABLE
// export const users = pgTable("users", {
//   userId: uuid("user_id").primaryKey().defaultRandom(),

//   fullname: varchar("fullname", { length: 255 }),
//   username: varchar("username", { length: 255 }).notNull().unique(),

//   bio: text("bio"),
//   avatar: text("avatar"),

//   email: varchar("email", { length: 255 }).notNull().unique(),
//   password: text("password").notNull(),

//   forgotPasswordToken: text("forgot_password_token"),

//   phoneNumber: varchar("phone_number", { length: 20 }),

//   role: userRoleEnum("role").default("USER"),
//   status: userStatusEnum("status").default("ACTIVE"),

//   dateOfBirth: date("date_of_birth"),

//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });
export const userStatusEnum = pgEnum("user_status", ["active", "inactive"]);

// enum cho role
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "manager"]);
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  fullname: text("fullname").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  username: text("username").notNull().unique(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),

  status: userStatusEnum("status").default("active").notNull(),
  role: userRoleEnum("role").default("user").notNull(),

  emailVerifyToken: text("email_verify_token"),
  forgotPasswordToken: text("forgot_password_token"),

  bio: text("bio"),
  avatar: text("avatar"),

  to_province: integer("to_province"),
  to_district: integer("to_district"),
  to_ward: text("to_ward"),
  to_address: text("to_address"),
});
