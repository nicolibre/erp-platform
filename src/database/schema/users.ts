import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { roles } from "./roles";

import { companies } from "./companies";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

companyId: uuid("company_id")
  .notNull()
  .references(() => companies.id),

roleId: uuid("role_id")
  .notNull()
  .references(() => roles.id),

email: varchar("email", { length: 255 })
  .notNull()
  .unique(),

  passwordHash: varchar("password_hash", { length: 255 }).notNull(),

  firstName: varchar("first_name", { length: 100 }).notNull(),

  lastName: varchar("last_name", { length: 100 }).notNull(),

  phone: varchar("phone", { length: 20 }),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});