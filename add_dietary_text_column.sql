-- Add dietary_requirements_text column to RSVPS table
-- Run this in your Supabase SQL Editor

ALTER TABLE public.rsvps 
ADD COLUMN IF NOT EXISTS dietary_requirements_text TEXT;

-- Add comment
COMMENT ON COLUMN public.rsvps.dietary_requirements_text IS 'Text description of dietary requirements or allergies';

