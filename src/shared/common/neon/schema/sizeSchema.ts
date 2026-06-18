import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { sizeTypes } from "./sizeTypeSchema";

// enum status (optional, nếu muốn reuse thì tách ra file riêng)
export const sizeStatusEnum = pgEnum("size_status", ["active", "inactive"]);

export const sizes = pgTable("sizes", {
  id: uuid("id").defaultRandom().primaryKey(),

  // 🔑 foreign key
  sizeTypeId: uuid("size_type_id")
    .notNull()
    .references(() => sizeTypes.id),

  nameSize: text("name_size").notNull(),

  status: sizeStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
