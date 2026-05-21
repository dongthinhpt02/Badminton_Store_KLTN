import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const paymentStatusEnum = pgEnum("payment_status", [
  "active",
  "inactive",
]);

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),

  namePayment: text("name_payment").notNull(),

  status: paymentStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
