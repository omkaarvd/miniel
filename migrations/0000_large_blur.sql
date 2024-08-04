CREATE TABLE IF NOT EXISTS "miniel_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"uri_id" text NOT NULL,
	"visited_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "miniel_analytics_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "miniel_uri" (
	"id" serial PRIMARY KEY NOT NULL,
	"short_url_id" text NOT NULL,
	"main_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expiry_time" timestamp DEFAULT '2024-08-04 22:19:09.947',
	CONSTRAINT "miniel_uri_id_unique" UNIQUE("id"),
	CONSTRAINT "miniel_uri_short_url_id_unique" UNIQUE("short_url_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "miniel_analytics" ADD CONSTRAINT "miniel_analytics_uri_id_miniel_uri_short_url_id_fk" FOREIGN KEY ("uri_id") REFERENCES "public"."miniel_uri"("short_url_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
