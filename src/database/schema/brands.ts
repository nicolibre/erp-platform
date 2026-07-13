import { pgTable } from "drizzle-orm/pg-core";

import {
  commonColumns,
  tenantColumns,
  auditColumns,
  softDeleteColumns,
  namedEntityColumns,
} from "./common";

export const brands = pgTable("brands", {
  // Base
  ...commonColumns,

  // Multiempresa
  ...tenantColumns,

  // Auditoría
  ...auditColumns,

  // Soft Delete
  ...softDeleteColumns,

  // code, name, description
  ...namedEntityColumns,
});