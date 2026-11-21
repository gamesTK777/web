ALTER TABLE webcraft_rooms ADD COLUMN tag_bots INTEGER NOT NULL DEFAULT 0
  CHECK (typeof(tag_bots)='integer' AND tag_bots BETWEEN 0 AND 4 AND
    (tag_bots=0 OR (tag_enabled=1 AND tag_minutes>0 AND (stage='flat' OR tag_stage IS 'school'))));
