import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  integer,
  numeric,
} from "drizzle-orm/pg-core";

export const promotionStatusEnum = pgEnum("promotion_status", [
  "active",
  "inactive",
]);

export const promotions = pgTable("promotions", {
  id: uuid("id").defaultRandom().primaryKey(),

  codePromotion: text("code_promotion").notNull().unique(),

  valuePromotion: numeric("value_promotion", {
    precision: 10,
    scale: 2,
  }).notNull(),

  status: promotionStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
