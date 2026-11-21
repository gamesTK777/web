ALTER TABLE webcraft_rooms ADD COLUMN stage TEXT NOT NULL DEFAULT 'classic' CHECK (stage IN ('classic','flat','lake'));
