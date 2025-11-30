-- SIMPLE FIX: Disable RLS entirely for the RSVPS table
-- Since this is a public RSVP form, we don't need RLS restrictions

-- Disable RLS
ALTER TABLE public.rsvps DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies (cleanup)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'rsvps' AND schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.rsvps';
    END LOOP;
END $$;

