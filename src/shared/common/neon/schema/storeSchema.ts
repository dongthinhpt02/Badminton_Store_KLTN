import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const storeStatusEnum = pgEnum("store_status", ["active", "inactive"]);

export const stores = pgTable("stores", {
  id: uuid("id").defaultRandom().primaryKey(),

  nameStore: text("name_store").notNull(),

  status: storeStatusEnum("status").default("active").notNull(),

  from_province: integer("from_province").notNull(),
  from_district: integer("from_district").notNull(),
  from_ward: text("from_ward").notNull(),
  from_address: text("from_address").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  activated_at: timestamp("activated_at"),
  inactivated_at: timestamp("inactivated_at"),
});
