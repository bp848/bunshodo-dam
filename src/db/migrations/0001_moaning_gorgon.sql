ALTER TABLE "files" ADD COLUMN "is_favourite" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "storage" varchar(20);--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "max_team" integer DEFAULT 2;