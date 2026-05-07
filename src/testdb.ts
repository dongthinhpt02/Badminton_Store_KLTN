import { db } from "./shared/common/neon/index";
import { sql } from "drizzle-orm";
import "dotenv/config";
export default async function testDB() {
  try {
    console.log("👉 Testing DB connection...");

    // const result = await db.execute(sql`SELECT 1 as ok`);
    await db.execute(sql`select pg_sleep(2)`);
    console.log("DONE");

    const result = await db.execute(sql`select 1 as ok`);

    console.log("👉 AFTER QUERY\n");

    console.log("✅ DB Connected:", result);
  } catch (err) {
    console.error("❌ DB ERROR:", err);
    throw err;
  }
}
