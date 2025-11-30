-- Create RSVPS table in public schema
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  plus_one BOOLEAN DEFAULT FALSE NOT NULL,
  dietary_requirements BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON public.rsvps(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for RSVP submissions)
-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.rsvps;

CREATE POLICY "Allow anonymous inserts" ON public.rsvps
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (optional - adjust as needed)
CREATE POLICY "Allow authenticated reads" ON public.rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comment to table
COMMENT ON TABLE public.rsvps IS 'Stores RSVP submissions for the engagement party';

