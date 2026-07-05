import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query(
  "select current_database(), current_user, current_schema()",
  (err, res) => {
    console.log("DB INFO:", err ?? res.rows);
  },
);

pool.query(
  "select table_name from information_schema.tables where table_schema='public'",
  (err, res) => {
    console.log("TABLES:", res?.rows);
  },
);

export const db = drizzle(pool, { schema });
