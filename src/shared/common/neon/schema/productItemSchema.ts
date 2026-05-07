import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { products } from "./productSchema";
import { promotions } from "./promotionSchema";
import { colors } from "./colorSchema";
import { sizes } from "./sizeSchema";

export const productItemStatusEnum = pgEnum("product_item_status", [
  "active",
  "inactive",
]);

export const productItems = pgTable("product_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),

  promotionId: uuid("promotion_id").references(() => promotions.id),

  colorId: uuid("color_id")
    .notNull()
    .references(() => colors.id),

  sizeId: uuid("size_id")
    .notNull()
    .references(() => sizes.id),

  nameProductItem: text("name_product_item").notNull(),

  normalizedNameProductItem: text("normalized_name_product_item").notNull(),

  quantity: integer("quantity").notNull(),

  price: numeric("price", { precision: 10, scale: 2 }).notNull(),

  pricePromotion: numeric("price_promotion", { precision: 10, scale: 2 }),

  imageProductItem: text("image_product_item").array(),

  description: text("description"),

  status: productItemStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
