ALTER TABLE webcraft_rooms ADD COLUMN tag_enabled INTEGER NOT NULL DEFAULT 0 CHECK (tag_enabled IN (0,1));
--> statement-breakpoint
ALTER TABLE webcraft_members ADD COLUMN pose_at INTEGER NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE webcraft_members ADD COLUMN previous_pose TEXT;
--> statement-breakpoint
ALTER TABLE webcraft_members ADD COLUMN previous_pose_at INTEGER NOT NULL DEFAULT 0;
--> statement-breakpoint
CREATE TABLE webcraft_tag_state (
  room_code TEXT PRIMARY KEY NOT NULL REFERENCES webcraft_rooms(code) ON DELETE CASCADE,
  it TEXT,
  phase TEXT NOT NULL DEFAULT 'waiting' CHECK (phase IN ('waiting','hiding','playing')),
  hide_until INTEGER NOT NULL DEFAULT 0,
  seq INTEGER NOT NULL DEFAULT 0,
  previous_it TEXT,
  protected_until INTEGER NOT NULL DEFAULT 0
);
