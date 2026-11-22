ALTER TABLE webcraft_rooms ADD COLUMN world_stage TEXT CHECK (
  world_stage IS NULL OR world_stage IN ('classic','flat','lake','school','frontier','park','crossing'));
