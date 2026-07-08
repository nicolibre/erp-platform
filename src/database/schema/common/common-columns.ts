import { sql } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";

export const commonColumns = {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
};