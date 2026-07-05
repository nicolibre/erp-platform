// common-columns.ts

import { auditColumns } from "./audit-columns";
import { tenantColumns } from "./tenant-columns";
import { softDeleteColumns } from "./soft-delete-columns";

export const commonColumns = {
  ...tenantColumns,
  ...softDeleteColumns,
  ...auditColumns,
};