import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL!;

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL is missing");
}

export const sql = neon(databaseUrl);

// test connection ngay lúc start
await sql`select 1`;

export const db = drizzle(sql, { schema });
