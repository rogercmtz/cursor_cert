-- Users table: store Google (and other provider) user details on first sign-in
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  image text,
  provider_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "Allow all for users"
  on public.users
  for all
  using (true)
  with check (true);

create index if not exists users_email_idx on public.users (email);
