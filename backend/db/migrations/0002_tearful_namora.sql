DO $$ BEGIN
 CREATE TYPE "permissions" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "permission" "permissions" DEFAULT 'user' NOT NULL;