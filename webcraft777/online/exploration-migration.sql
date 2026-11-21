ALTER TABLE webcraft_rooms ADD COLUMN mode TEXT NOT NULL DEFAULT 'creative' CHECK (mode IN ('creative','explore'));
--> statement-breakpoint
ALTER TABLE webcraft_cells ADD COLUMN action_id TEXT;
--> statement-breakpoint
CREATE TABLE webcraft_edit_receipts (
  room_code TEXT NOT NULL REFERENCES webcraft_rooms(code) ON DELETE CASCADE,
  action_id TEXT NOT NULL,
  voxel INTEGER NOT NULL,
  block INTEGER NOT NULL,
  PRIMARY KEY(room_code, action_id)
);
--> statement-breakpoint
CREATE TRIGGER webcraft_receipt_insert AFTER INSERT ON webcraft_cells
WHEN NEW.action_id IS NOT NULL
BEGIN
  INSERT INTO webcraft_edit_receipts(room_code,action_id,voxel,block)
    VALUES(NEW.room_code,NEW.action_id,NEW.voxel,NEW.block);
END;
--> statement-breakpoint
CREATE TRIGGER webcraft_receipt_update AFTER UPDATE OF action_id ON webcraft_cells
WHEN NEW.action_id IS NOT NULL
BEGIN
  INSERT INTO webcraft_edit_receipts(room_code,action_id,voxel,block)
    VALUES(NEW.room_code,NEW.action_id,NEW.voxel,NEW.block);
END;
