export interface BaseEntity {
  id: string;

  companyId: string;

  isActive: boolean;

  createdAt: Date;
  createdBy?: string | null;

  updatedAt: Date;
  updatedBy?: string | null;

  deletedAt?: Date | null;
  deletedBy?: string | null;
}