import {
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

import {
  commonColumns,
  tenantColumns,
  auditColumns,
  softDeleteColumns,
  namedEntityColumns,
} from "./common";

export const units = pgTable("units", {
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

  // Campos propios de Units
  symbol: varchar("symbol", {
    length: 10,
  }).notNull(),
});