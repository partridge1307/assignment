DO $$ BEGIN
 CREATE TYPE "permissions" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "carts" (
	"user_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "carts_user_id_book_id_pk" PRIMARY KEY("user_id","book_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "histories" (
	"user_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "histories_user_id_book_id_pk" PRIMARY KEY("user_id","book_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"user_id" serial NOT NULL,
	"token" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"permission" "permissions" DEFAULT 'user' NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "unique_username" UNIQUE("username")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "author_unique_name_idx" ON "authors" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "book_unique_name_idx" ON "books" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_username_idx" ON "users" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books" ADD CONSTRAINT "book_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "histories" ADD CONSTRAINT "histories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "histories" ADD CONSTRAINT "histories_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
