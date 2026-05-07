// import "dotenv/config";
// import postgres from "postgres";
// import { drizzle } from "drizzle-orm/postgres-js";
// import * as schema from "./schema";
// import appConfig from "../config";

// const databaseUrl = appConfig.NEON.databaseUrl as string;
// console.log("DB URL:", databaseUrl);

// if (!databaseUrl) {
//   throw new Error("❌ DATABASE_URL is missing");
// }

// // const client = postgres(databaseUrl, {
// //   ssl: "require",
// //   connect_timeout: 10,
// //   max: 5,
// //   debug: (conn, query) => {
// //     console.log("SQL:", query);
// //   },
// // });
// const client = postgres(databaseUrl, {
//   ssl: {
//     rejectUnauthorized: false,
//   },
//   connect_timeout: 10,
//   idle_timeout: 20,
//   max: 5,
//   debug: (conn, query) => {
//     console.log("SQL:", query);
//   },
// });

// export const db = drizzle(client, { schema });

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
