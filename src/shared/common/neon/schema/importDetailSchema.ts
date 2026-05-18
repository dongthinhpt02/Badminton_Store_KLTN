import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { imports } from "./importSchema";
import { productItems } from "./productItemSchema";

export const importDetailStatusEnum = pgEnum("import_detail_status", [
  "active",
  "inactive",
]);

export const importDetails = pgTable("import_details", {
  id: uuid("id").defaultRandom().primaryKey(),

  importId: uuid("import_id")
    .notNull()
    .references(() => imports.id),

  productItemId: uuid("product_item_id")
    .notNull()
    .references(() => productItems.id),

  nameProductItem: text("name_product_item").notNull(),

  imgProductItem: text("img_product_item").notNull(),

  quantity: integer("quantity").notNull(),
});
