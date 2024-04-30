CREATE TABLE IF NOT EXISTS "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "authors_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"cover" text NOT NULL,
	"name" text NOT NULL,
	"author_id" serial NOT NULL,
	"description" text NOT NULL,
	"pages" integer NOT NULL,
	"price" double precision NOT NULL,
	"on_sale" boolean DEFAULT false NOT NULL,
	"sold" integer DEFAULT 0 NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "books_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DROP INDEX IF EXISTS "user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "username_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "author_unique_name_idx" ON "authors" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "book_unique_name_idx" ON "books" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_username_idx" ON "users" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books" ADD CONSTRAINT "book_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
