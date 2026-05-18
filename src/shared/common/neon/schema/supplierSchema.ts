import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const supplierStatusEnum = pgEnum("supplier_status", [
  "active",
  "inactive",
]);

export const suppliers = pgTable("suppliers", {
  id: uuid("id").defaultRandom().primaryKey(),

  nameSupplier: text("name_supplier").notNull(),

  address: text("address").notNull(),

  status: supplierStatusEnum("status").default("active").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at"),
  restored_at: timestamp("restored_at"),
});
