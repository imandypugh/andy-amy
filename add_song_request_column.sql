-- Add song_request column to RSVPS table
-- Run this in your Supabase SQL Editor

ALTER TABLE public.rsvps 
ADD COLUMN IF NOT EXISTS song_request VARCHAR(200);

-- Add comment
COMMENT ON COLUMN public.rsvps.song_request IS 'Song or karaoke request from the guest';

