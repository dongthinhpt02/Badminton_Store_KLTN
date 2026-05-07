import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const brandStatusEnum = pgEnum("brand_status", ["active", "inactive"]);

export const brands = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),

  nameBrand: text("name_brand").notNull(),

  imageBrand: text("image_brand"),
  country: text("country"),

  description: text("description"),

  status: brandStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
