import {
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const auditColumns = {
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  createdBy: uuid("created_by"),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),

  updatedBy: uuid("updated_by"),
};