import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { brands } from "./brandSchema";
import { categories } from "./categorySchema";
import { sizeTypes } from "./sizeTypeSchema";

export const productStatusEnum = pgEnum("product_status", [
  "active",
  "inactive",
]);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),

  brandId: uuid("brand_id")
    .notNull()
    .references(() => brands.id),

  cateId: uuid("cate_id")
    .notNull()
    .references(() => categories.id),

  sizeTypeId: uuid("size_type_id")
    .notNull()
    .references(() => sizeTypes.id),

  nameProduct: text("name_product").notNull(),

  imageProduct: text("image_product"),
  description: text("description"),

  status: productStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
