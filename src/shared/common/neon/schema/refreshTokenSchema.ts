import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";

export const refreshToken = pgTable("refresh_tokens", {
  refreshTokenId: uuid("token_id").primaryKey().defaultRandom(),
  token: text("token").notNull(),
});
