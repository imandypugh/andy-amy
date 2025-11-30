-- Add phone_number column to RSVPS table
-- Run this in your Supabase SQL Editor

ALTER TABLE public.rsvps 
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20);

-- Add comment
COMMENT ON COLUMN public.rsvps.phone_number IS 'Contact phone number for the RSVP';

