import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";

export const orderStatusEnum = pgEnum("order_status", [
  "processing",
  "delivered",
  "completed",
  "cancelled",
]);

// =========================
// ORDER
// =========================
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),

  fullname: text("fullname").notNull(),

  totalQuantity: integer("total_quantity").notNull().default(0),

  totalCart: integer("total_cart").notNull().default(0),

  shippingFee: integer("shipping_fee").notNull().default(0),

  totalCartOrder: integer("total_cart_order").notNull().default(0),

  address: text("address").notNull(),

  phonenumber: text("phonenumber").notNull(),

  status: orderStatusEnum("status").notNull().default("processing"),

  namePayment: text("name_payment").notNull(),

  from_district_id: integer("from_district_id").notNull(),

  from_ward_code: text("from_ward_code").notNull(),

  to_district_id: integer("to_district_id").notNull(),

  to_ward_code: text("to_ward_code").notNull(),

  cod_amount: integer("cod_amount").notNull().default(0),

  created_at: timestamp("created_at").defaultNow().notNull(),

  delivered_at: timestamp("delivered_at"),

  completed_at: timestamp("completed_at"),
});
