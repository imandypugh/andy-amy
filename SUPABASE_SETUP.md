# Supabase Setup Instructions

## Database Schema

Run the SQL in `supabase_schema.sql` in your Supabase SQL Editor to create the RSVPS table.

## Environment Variables

Make sure your `.env` file (in the root directory) contains:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important:** 
- The `VITE_` prefix is required for Vite to expose these variables to your React app
- Replace `your_supabase_project_url` with your actual Supabase project URL (e.g., `https://xxxxx.supabase.co`)
- Replace `your_supabase_anon_key` with your actual Supabase anon/public key

## Table Schema

The `rsvps` table has the following structure:

- `id` (UUID, Primary Key) - Auto-generated
- `first_name` (VARCHAR) - Required
- `last_name` (VARCHAR) - Required  
- `plus_one` (BOOLEAN) - Default: false
- `dietary_requirements` (BOOLEAN) - Default: false
- `created_at` (TIMESTAMP) - Auto-generated
- `updated_at` (TIMESTAMP) - Auto-generated

## Row Level Security (RLS)

The table has RLS enabled with:
- **Anonymous inserts** - Anyone can submit an RSVP
- **Authenticated reads** - Only authenticated users can view RSVPs (adjust as needed)

## Testing

After setting up:
1. Make sure your `.env` file has the correct values
2. Restart your dev server (`npm run dev`)
3. Submit a test RSVP through the form
4. Check your Supabase dashboard to verify the data was inserted

