import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

import { users } from "./userSchema";

export const conversationStatusEnum = pgEnum("conversation_status", [
  "waiting",
  "chatting",
  "closed",
]);

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),

  managerId: uuid("manager_id").references(() => users.id),

  status: conversationStatusEnum("status").default("waiting").notNull(),

  lastMessage: text("last_message"),

  lastMessageAt: timestamp("last_message_at", {
    withTimezone: true,
  }),

  created_at: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updated_at: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  closed_at: timestamp("closed_at", {
    withTimezone: true,
  }),
});
