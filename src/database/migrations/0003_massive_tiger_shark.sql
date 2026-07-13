CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "categories_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp (3) with time zone;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "created_at" SET DATA TYPE timestamp (3) with time zone;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DATA TYPE timestamp (3) with time zone;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "code" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;