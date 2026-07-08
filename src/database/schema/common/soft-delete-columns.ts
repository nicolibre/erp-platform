import {
  boolean,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const softDeleteColumns = {
  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  deletedAt: timestamp("deleted_at", {
    withTimezone: true,
    precision: 3,
  }),

  deletedBy: uuid("deleted_by"),
};