create extension if not exists pgcrypto;

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.waitlist
  add column if not exists status text not null default 'pending',
  add column if not exists verified_at timestamptz,
  add column if not exists last_verification_sent_at timestamptz,
  add column if not exists resend_count integer not null default 0;

update public.waitlist
set email = lower(trim(email))
where email is distinct from lower(trim(email));

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'waitlist_status_check'
      and conrelid = 'public.waitlist'::regclass
  ) then
    alter table public.waitlist
      add constraint waitlist_status_check check (status in ('pending', 'verified'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'waitlist_email_normalized_check'
      and conrelid = 'public.waitlist'::regclass
  ) then
    alter table public.waitlist
      add constraint waitlist_email_normalized_check check (email = lower(trim(email)));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'waitlist_email_key'
      and conrelid = 'public.waitlist'::regclass
  ) then
    alter table public.waitlist
      add constraint waitlist_email_key unique (email);
  end if;
end $$;

alter table public.waitlist enable row level security;

drop policy if exists "deny public waitlist access" on public.waitlist;
create policy "deny public waitlist access"
  on public.waitlist
  for all
  to anon, authenticated
  using (false)
  with check (false);

comment on table public.waitlist is 'Production waitlist for MemShift. Accessed only through server-side API.';

