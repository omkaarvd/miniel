ALTER TABLE "miniel_uri" ALTER COLUMN "expiry_time" SET DEFAULT '2024-08-08 15:25:08.657';--> statement-breakpoint
ALTER TABLE "miniel_analytics" DROP COLUMN IF EXISTS "ip";--> statement-breakpoint
ALTER TABLE "miniel_analytics" DROP COLUMN IF EXISTS "browser";--> statement-breakpoint
ALTER TABLE "miniel_analytics" DROP COLUMN IF EXISTS "device";--> statement-breakpoint
ALTER TABLE "miniel_analytics" DROP COLUMN IF EXISTS "platform";