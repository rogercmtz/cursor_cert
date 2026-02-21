# Supabase setup for API Keys dashboard

1. **Create a project** at [supabase.com/dashboard](https://supabase.com/dashboard).

2. **Run the migration** in the SQL Editor (Dashboard → SQL Editor → New query):
   - Copy the contents of `migrations/20250219000000_create_api_keys.sql` and run it.

3. **Get your credentials** (Dashboard → Project Settings → API):
   - Project URL → use as `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Add to `.env.local`**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

5. Restart the dev server (`npm run dev`) and open `/dashboards`.
