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
  cartId: uuid("cartId")
    .notNull()
    .references(() => cart.id),
  productItemId: uuid("productItemId")
    .notNull()
    .references(() => productItems.id),
  nameProductItem: text("nameProductItem").notNull(),
  price: integer("price").notNull(),
  pricePromotion: integer("pricePromotion"),
  status: cartItemStatusEnum("status").notNull().default("untick"),
  quantity: integer("quantity").notNull(),
  imageProductItem: text("imageProductItem").notNull(),
  totalPriceCartItem: integer("totalPriceCartItem").notNull(),
});
