-- Fix RLS policies for RSVPS table
-- Run this in your Supabase SQL Editor

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.rsvps;
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.rsvps;

-- Create a more permissive insert policy that allows anyone to insert
CREATE POLICY "Allow public inserts" ON public.rsvps
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read (you can adjust this as needed)
CREATE POLICY "Allow authenticated reads" ON public.rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- If you want to allow anonymous users to read too (optional):
-- CREATE POLICY "Allow anonymous reads" ON public.rsvps
--   FOR SELECT
--   TO anon
--   USING (true);

