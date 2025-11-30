-- FINAL FIX for RLS on RSVPS table
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Drop ALL existing policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'rsvps' AND schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.rsvps';
    END LOOP;
END $$;

-- Step 2: Make sure RLS is enabled
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Step 3: Create a policy that allows INSERT for everyone (using public role)
-- This works for both anonymous and authenticated users
CREATE POLICY "Allow all inserts" ON public.rsvps
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Step 4: Verify the policy was created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'rsvps';

