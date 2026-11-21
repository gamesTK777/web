ALTER TABLE webcraft_rooms ADD COLUMN tag_stage TEXT CHECK (tag_stage IS NULL OR (tag_stage='school' AND tag_enabled=1 AND tag_minutes>0 AND stage='classic'));
