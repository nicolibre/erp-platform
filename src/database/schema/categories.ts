import {
  pgTable,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

import {
  commonColumns,
  namedEntityColumns,
} from "./common";

export const categories = pgTable("categories", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  ...commonColumns,

  ...namedEntityColumns,

  parentId: uuid("parent_id"),

  imageUrl: varchar("image_url", {
    length: 255,
  }),

  sortOrder: integer("sort_order")
    .default(0)
    .notNull(),
});