CREATE TABLE "units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_by" uuid,
	"is_active" boolean DEFAULT true NOT NULL,
	"deleted_at" timestamp (3) with time zone,
	"deleted_by" uuid,
	"code" varchar(20) NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	"symbol" varchar(10) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;