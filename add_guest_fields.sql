-- Add guest-related columns to RSVPS table
-- Run this in your Supabase SQL Editor

ALTER TABLE public.rsvps 
ADD COLUMN IF NOT EXISTS guest_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS guest_dietary_requirements BOOLEAN DEFAULT FALSE NOT NULL,
ADD COLUMN IF NOT EXISTS guest_dietary_requirements_text TEXT;

-- Add comments
COMMENT ON COLUMN public.rsvps.guest_name IS 'Name of the guest if plus_one is true';
COMMENT ON COLUMN public.rsvps.guest_dietary_requirements IS 'Whether the guest has dietary requirements';
COMMENT ON COLUMN public.rsvps.guest_dietary_requirements_text IS 'Text description of guest dietary requirements or allergies';

