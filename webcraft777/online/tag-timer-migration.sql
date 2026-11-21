ALTER TABLE webcraft_rooms ADD COLUMN tag_minutes INTEGER NOT NULL DEFAULT 0 CHECK (tag_minutes IN (0,1,3,5,10,15));
--> statement-breakpoint
ALTER TABLE webcraft_tag_state ADD COLUMN ends_at INTEGER NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE webcraft_tag_state ADD COLUMN round_roster TEXT;
--> statement-breakpoint
ALTER TABLE webcraft_tag_state ADD COLUMN round_result TEXT;
