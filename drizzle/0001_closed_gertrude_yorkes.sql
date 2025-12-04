ALTER TABLE "transactions" RENAME COLUMN "activity" TO "description";--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "id" SET DATA TYPE text;