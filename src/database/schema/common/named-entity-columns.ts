import { varchar } from "drizzle-orm/pg-core";

export const namedEntityColumns = {
  code: varchar("code", {
    length: 30,
  }).notNull(),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  description: varchar("description", {
    length: 500,
  }),
};