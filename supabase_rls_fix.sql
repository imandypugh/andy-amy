-- Complete RLS fix for RSVPS table
-- Run this entire script in your Supabase SQL Editor

-- First, drop ALL existing policies on the rsvps table
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.rsvps;
DROP POLICY IF EXISTS "Allow public inserts" ON public.rsvps;
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.rsvps;
DROP POLICY IF EXISTS "Allow anonymous reads" ON public.rsvps;

-- Create a simple insert policy that allows anyone (anon role) to insert
-- This is what gets used when you use the anon key
CREATE POLICY "Enable insert for anon users" ON public.rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert (if needed)
CREATE POLICY "Enable insert for authenticated users" ON public.rsvps
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to read
CREATE POLICY "Enable read for authenticated users" ON public.rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Verify RLS is enabled
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

