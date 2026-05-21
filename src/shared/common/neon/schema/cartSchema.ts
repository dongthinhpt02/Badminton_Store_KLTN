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
export const cart = pgTable("carts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId").notNull(),
  totalQuantity: integer("totalQuantity").default(0).notNull(),

  // tiền nên dùng numeric (decimal) cho chuẩn
  totalPrice: integer("totalPrice").default(0).notNull(),
});
