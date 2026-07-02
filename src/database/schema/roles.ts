import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  code: varchar("code", {
    length: 30,
  })
    .notNull()
    .unique(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  description: varchar("description", {
    length: 255,
  }),

  level: integer("level")
    .default(100)
    .notNull(),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});