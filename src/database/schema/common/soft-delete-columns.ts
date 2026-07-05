import {
  boolean,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const softDeleteColumns = {
  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  deletedAt: timestamp("deleted_at"),

  deletedBy: uuid("deleted_by"),
};