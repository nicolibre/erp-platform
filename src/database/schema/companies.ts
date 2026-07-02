import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),

  code: varchar("code", { length: 20 }).notNull().unique(),

  businessName: varchar("business_name", {
    length: 200,
  }).notNull(),

  tradeName: varchar("trade_name", {
    length: 200,
  }),

  taxId: varchar("tax_id", {
    length: 20,
  }).notNull(),

  email: varchar("email", {
    length: 150,
  }),

  phone: varchar("phone", {
    length: 30,
  }),

  website: varchar("website", {
    length: 150,
  }),

  status: boolean("status").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});