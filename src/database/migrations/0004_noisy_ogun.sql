ALTER TABLE "brands" ADD COLUMN "company_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "created_at" timestamp (3) with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "created_by" uuid;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "updated_by" uuid;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "deleted_at" timestamp (3) with time zone;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "deleted_by" uuid;--> statement-breakpoint
ALTER TABLE "brands" ADD CONSTRAINT "brands_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;