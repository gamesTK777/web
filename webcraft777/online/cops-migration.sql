ALTER TABLE webcraft_rooms ADD COLUMN cops_stage TEXT CHECK (
  cops_stage IS NULL OR (cops_stage IN ('park','crossing') AND mode='creative' AND stage='classic'
    AND tag_stage IS NULL AND tag_enabled=0 AND tag_bots=0 AND tag_minutes=0));
--> statement-breakpoint
ALTER TABLE webcraft_rooms ADD COLUMN cops_minutes INTEGER NOT NULL DEFAULT 0 CHECK (
  (cops_stage IS NULL AND cops_minutes=0) OR (cops_stage IS NOT NULL AND cops_minutes IN (1,3,5,10,15)));
--> statement-breakpoint
ALTER TABLE webcraft_members ADD COLUMN ride_id TEXT CHECK (ride_id IN ('swings','seesaw'));
--> statement-breakpoint
ALTER TABLE webcraft_members ADD COLUMN ride_seat INTEGER CHECK (ride_seat BETWEEN 0 AND 3);
--> statement-breakpoint
ALTER TABLE webcraft_members ADD COLUMN ride_pump INTEGER NOT NULL DEFAULT 0 CHECK (ride_pump IN (-1,0,1));
--> statement-breakpoint
CREATE UNIQUE INDEX webcraft_ride_seats ON webcraft_members(room_code,ride_id,ride_seat) WHERE ride_id IS NOT NULL;
--> statement-breakpoint
CREATE TABLE webcraft_cops_state (
  room_code TEXT PRIMARY KEY NOT NULL REFERENCES webcraft_rooms(code) ON DELETE CASCADE,
  phase TEXT NOT NULL DEFAULT 'waiting' CHECK (phase IN ('waiting','hiding','playing','finished')),
  hide_until INTEGER NOT NULL DEFAULT 0,
  ends_at INTEGER NOT NULL DEFAULT 0,
  seq INTEGER NOT NULL DEFAULT 0,
  protected_until INTEGER NOT NULL DEFAULT 0,
  roster TEXT NOT NULL DEFAULT '[]',
  police TEXT NOT NULL DEFAULT '[]',
  jailed TEXT NOT NULL DEFAULT '[]',
  event TEXT,
  winner TEXT CHECK (winner IN ('police','robbers'))
);
