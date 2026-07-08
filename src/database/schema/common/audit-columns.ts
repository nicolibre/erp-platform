import { timestamp, uuid } from "drizzle-orm/pg-core";

export const auditColumns = {
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 3,
  })
    .defaultNow()
    .notNull(),

  createdBy: uuid("created_by"),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 3,
  })
    .defaultNow()
    .notNull(),

  updatedBy: uuid("updated_by"),
};