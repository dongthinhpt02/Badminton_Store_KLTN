import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const cateStatusEnum = pgEnum("cate_status", ["active", "inactive"]);

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),

  nameCate: text("name_cate").notNull(),

  imageCate: text("image_cate"),
  description: text("description"),

  status: cateStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
