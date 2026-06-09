import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

import { users } from "./userSchema";
import { conservations } from "./conservationSchema";

export const senderRoleEnum = pgEnum("sender_role", ["user", "manager"]);

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),

  conservationId: uuid("conservation_id")
    .notNull()
    .references(() => conservations.id),

  senderId: uuid("sender_id")
    .notNull()
    .references(() => users.id),

  senderRole: senderRoleEnum("sender_role").notNull(),

  content: text("content").notNull(),

  created_at: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
