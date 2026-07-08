import {
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const namedEntityColumns = {
  code: varchar("code", {
    length: 20,
  }).notNull(),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  description: text("description"),
};