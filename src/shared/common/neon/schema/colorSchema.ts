import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const colorStatusEnum = pgEnum("color_status", ["active", "inactive"]);

export const colors = pgTable("colors", {
  id: uuid("id").defaultRandom().primaryKey(),

  nameColor: text("name_color").notNull(),
  description: text("description"),

  status: colorStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
