CREATE TABLE IF NOT EXISTS "sessions" (
	"user_id" serial NOT NULL,
	"token" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "unique_token" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "unique_username" UNIQUE("username")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "users" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
