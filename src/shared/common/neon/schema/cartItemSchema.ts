import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  date,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { cart } from "./cartSchema";
import { productItems } from "./productItemSchema";

export const cartItemStatusEnum = pgEnum("cart_item_status", [
  "tick",
  "untick",
]);

export const cartItems = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id")
    .notNull()
    .references(() => cart.id),
  productItemId: uuid("product_item_id")
    .notNull()
    .references(() => productItems.id),
  nameProductItem: text("name_product_item").notNull(),
  price: integer("price").notNull(),
  pricePromotion: integer("price_promotion"),
  status: cartItemStatusEnum("status").notNull().default("untick"),
  quantity: integer("quantity").notNull(),
  imageProductItem: text("image_product_item").notNull(),
  totalPriceCartItem: integer("total_price_cart_item").notNull(),
});
