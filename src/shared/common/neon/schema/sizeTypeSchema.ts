import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const sizeTypeStatusEnum = pgEnum("size_type_status", [
  "active",
  "inactive",
]);

export const sizeTypes = pgTable("size_types", {
  id: uuid("id").defaultRandom().primaryKey(),

  nameSizeType: text("name_size_type").notNull(),
  description: text("description"),

  status: sizeTypeStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
