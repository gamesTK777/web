CREATE TABLE IF NOT EXISTS webcraft_rooms (
  code TEXT PRIMARY KEY NOT NULL,
  creator TEXT NOT NULL,
  name TEXT NOT NULL,
  seed TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  revision INTEGER NOT NULL DEFAULT 0,
  cell_count INTEGER NOT NULL DEFAULT 0,
  mode TEXT NOT NULL DEFAULT 'creative' CHECK (mode IN ('creative','explore')),
  tag_enabled INTEGER NOT NULL DEFAULT 0 CHECK (tag_enabled IN (0,1)),
  tag_minutes INTEGER NOT NULL DEFAULT 0 CHECK (tag_minutes IN (0,1,3,5,10,15)),
  stage TEXT NOT NULL DEFAULT 'classic' CHECK (stage IN ('classic','flat','lake')),
  tag_stage TEXT CHECK (tag_stage IS NULL OR (tag_stage='school' AND tag_enabled=1 AND tag_minutes>0 AND stage='classic')),
  tag_bots INTEGER NOT NULL DEFAULT 0 CHECK (typeof(tag_bots)='integer' AND tag_bots BETWEEN 0 AND 4 AND
    (tag_bots=0 OR (tag_enabled=1 AND tag_minutes>0 AND (stage='flat' OR tag_stage IS 'school')))),
  cops_stage TEXT CHECK (
    cops_stage IS NULL OR (cops_stage IN ('park','crossing') AND mode='creative' AND stage='classic'
      AND tag_stage IS NULL AND tag_enabled=0 AND tag_bots=0 AND tag_minutes=0)),
  cops_minutes INTEGER NOT NULL DEFAULT 0 CHECK (
    (cops_stage IS NULL AND cops_minutes=0) OR (cops_stage IS NOT NULL AND cops_minutes IN (1,3,5,10,15))),
  cops_bots INTEGER NOT NULL DEFAULT 0 CHECK (typeof(cops_bots)='integer' AND cops_bots BETWEEN 0 AND 4
    AND (cops_bots=0 OR cops_stage IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS webcraft_rooms_expiry ON webcraft_rooms(expires_at);

CREATE TABLE IF NOT EXISTS webcraft_members (
  room_code TEXT NOT NULL REFERENCES webcraft_rooms(code) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  last_seen INTEGER NOT NULL,
  pose TEXT,
  pose_at INTEGER NOT NULL DEFAULT 0,
  previous_pose TEXT,
  previous_pose_at INTEGER NOT NULL DEFAULT 0,
  sample_at INTEGER NOT NULL DEFAULT 0,
  pose_history TEXT NOT NULL DEFAULT '[]',
  ride_id TEXT CHECK (ride_id IN ('swings','seesaw')),
  ride_seat INTEGER CHECK (ride_seat BETWEEN 0 AND 3),
  ride_pump INTEGER NOT NULL DEFAULT 0 CHECK (ride_pump IN (-1,0,1)),
  PRIMARY KEY(room_code, token_hash)
);

CREATE UNIQUE INDEX IF NOT EXISTS webcraft_ride_seats ON webcraft_members(room_code,ride_id,ride_seat) WHERE ride_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS webcraft_cells (
  room_code TEXT NOT NULL REFERENCES webcraft_rooms(code) ON DELETE CASCADE,
  voxel INTEGER NOT NULL,
  block INTEGER NOT NULL,
  axis TEXT NOT NULL,
  revision INTEGER NOT NULL,
  action_id TEXT,
  PRIMARY KEY(room_code, voxel)
);

CREATE UNIQUE INDEX IF NOT EXISTS webcraft_cells_revision ON webcraft_cells(room_code,revision);

CREATE TRIGGER IF NOT EXISTS webcraft_cell_insert AFTER INSERT ON webcraft_cells
BEGIN
  UPDATE webcraft_rooms SET revision=NEW.revision, cell_count=cell_count+1 WHERE code=NEW.room_code;
END;

CREATE TRIGGER IF NOT EXISTS webcraft_cell_update AFTER UPDATE OF revision ON webcraft_cells
BEGIN
  UPDATE webcraft_rooms SET revision=NEW.revision WHERE code=NEW.room_code;
END;

CREATE TABLE IF NOT EXISTS webcraft_edit_receipts (
  room_code TEXT NOT NULL REFERENCES webcraft_rooms(code) ON DELETE CASCADE,
  action_id TEXT NOT NULL,
  voxel INTEGER NOT NULL,
  block INTEGER NOT NULL,
  PRIMARY KEY(room_code, action_id)
);

CREATE TRIGGER IF NOT EXISTS webcraft_receipt_insert AFTER INSERT ON webcraft_cells
WHEN NEW.action_id IS NOT NULL
BEGIN
  INSERT INTO webcraft_edit_receipts(room_code,action_id,voxel,block)
    VALUES(NEW.room_code,NEW.action_id,NEW.voxel,NEW.block);
END;

CREATE TRIGGER IF NOT EXISTS webcraft_receipt_update AFTER UPDATE OF action_id ON webcraft_cells
WHEN NEW.action_id IS NOT NULL
BEGIN
  INSERT INTO webcraft_edit_receipts(room_code,action_id,voxel,block)
    VALUES(NEW.room_code,NEW.action_id,NEW.voxel,NEW.block);
END;

CREATE TABLE IF NOT EXISTS webcraft_tag_state (
  room_code TEXT PRIMARY KEY NOT NULL REFERENCES webcraft_rooms(code) ON DELETE CASCADE,
  it TEXT,
  phase TEXT NOT NULL DEFAULT 'waiting' CHECK (phase IN ('waiting','hiding','playing')),
  hide_until INTEGER NOT NULL DEFAULT 0,
  seq INTEGER NOT NULL DEFAULT 0,
  previous_it TEXT,
  protected_until INTEGER NOT NULL DEFAULT 0,
  ends_at INTEGER NOT NULL DEFAULT 0,
  round_roster TEXT,
  round_result TEXT
);

CREATE TABLE IF NOT EXISTS webcraft_cops_state (
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
