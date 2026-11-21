ALTER TABLE webcraft_rooms ADD COLUMN cops_bots INTEGER NOT NULL DEFAULT 0 CHECK (
  typeof(cops_bots)='integer' AND cops_bots BETWEEN 0 AND 4 AND (cops_bots=0 OR cops_stage IS NOT NULL));
