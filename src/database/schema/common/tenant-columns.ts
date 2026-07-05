import { uuid } from "drizzle-orm/pg-core";
import { companies } from "../companies";

export const tenantColumns = {
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id),
};