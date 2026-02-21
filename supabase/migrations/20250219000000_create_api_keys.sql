-- API keys table for the dashboard
create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'default',
  type text not null default 'dev' check (type in ('dev', 'prod')),
  key text not null unique,
  usage integer not null default 0,
  created_at timestamptz not null default now()
);

-- Optional: enable Row Level Security (RLS) and add policies for authenticated users
-- For a simple demo, anon key can be allowed to do everything. Tighten in production.
alter table public.api_keys enable row level security;

-- Allow all operations for anon and authenticated (replace with your auth later)
create policy "Allow all for api_keys"
  on public.api_keys
  for all
  using (true)
  with check (true);

-- Create index for listing by created_at
create index if not exists api_keys_created_at_idx on public.api_keys (created_at desc);
