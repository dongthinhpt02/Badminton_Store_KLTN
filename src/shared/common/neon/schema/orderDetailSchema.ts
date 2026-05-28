import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { orders } from "./orderSchema";
import { productItems } from "./productItemSchema";

export const orderDetails = pgTable("order_details", {
  id: uuid("id").defaultRandom().primaryKey(),

  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id),

  productItemId: uuid("product_item_id")
    .notNull()
    .references(() => productItems.id),

  nameProductItem: text("name_product_item").notNull(),

  price: integer("price").notNull(),

  pricePromotion: integer("price_promotion"),

  quantity: integer("quantity").notNull(),

  imageProductItem: text("image_product_item").notNull(),

  totalPriceOrderDetail: integer("total_price_order_detail").notNull(),
});
