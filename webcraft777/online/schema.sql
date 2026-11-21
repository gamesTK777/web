CREATE TABLE IF NOT EXISTS webcraft_rooms (
  code TEXT PRIMARY KEY NOT NULL,
  creator TEXT NOT NULL,
  name TEXT NOT NULL,
  seed TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  revision INTEGER NOT NULL DEFAULT 0,
  cell_count INTEGER NOT NULL DEFAULT 0,
  mode TEXT NOT NULL DEFAULT 'creative' CHECK (mode IN ('creative','explore'))
);

CREATE INDEX IF NOT EXISTS webcraft_rooms_expiry ON webcraft_rooms(expires_at);

CREATE TABLE IF NOT EXISTS webcraft_members (
  room_code TEXT NOT NULL REFERENCES webcraft_rooms(code) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  last_seen INTEGER NOT NULL,
  pose TEXT,
  PRIMARY KEY(room_code, token_hash)
);

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
