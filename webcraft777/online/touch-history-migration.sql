ALTER TABLE webcraft_members ADD COLUMN sample_at INTEGER NOT NULL DEFAULT 0;
ALTER TABLE webcraft_members ADD COLUMN pose_history TEXT NOT NULL DEFAULT '[]';
