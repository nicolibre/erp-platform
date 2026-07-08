import {
  pgTable,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

import {
  commonColumns,
  tenantColumns,
  auditColumns,
  softDeleteColumns,
  namedEntityColumns,
} from "./common";

export const categories = pgTable("categories", {
  // Columnas base
  ...commonColumns,

  // Multiempresa
  ...tenantColumns,

  // Auditoría
  ...auditColumns,

  // Soft Delete
  ...softDeleteColumns,

  // code, name y description
  ...namedEntityColumns,

  // Campos propios de Categories
  parentId: uuid("parent_id"),

  imageUrl: varchar("image_url", {
    length: 255,
  }),

  sortOrder: integer("sort_order")
    .default(0)
    .notNull(),
});