import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { suppliers } from "./supplierSchema";
import { desc } from "drizzle-orm";

export const importStatusEnum = pgEnum("import_status", ["active", "inactive"]);

export const imports = pgTable("imports", {
  id: uuid("id").defaultRandom().primaryKey(),

  supplierId: uuid("supplier_id")
    .notNull()
    .references(() => suppliers.id),

  importDate: timestamp("import_date").notNull(),

  title: text("title").notNull(),

  description: text("description"),
});
