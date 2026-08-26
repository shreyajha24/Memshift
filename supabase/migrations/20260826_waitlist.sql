create extension if not exists pgcrypto;

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'pending' check (status in ('pending', 'verified')),
  created_at timestamptz not null default now(),
  verified_at timestamptz,
  last_verification_sent_at timestamptz,
  resend_count integer not null default 0
);

alter table public.waitlist enable row level security;

drop policy if exists "deny public waitlist access" on public.waitlist;
create policy "deny public waitlist access"
  on public.waitlist
  for all
  to anon, authenticated
  using (false)
  with check (false);

comment on table public.waitlist is 'Production waitlist for MemShift. Accessed only through server-side API.';
