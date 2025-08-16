-- Enable UUID generation
create extension if not exists pgcrypto;

-- Public table: tasks
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  is_complete boolean not null default false,
  inserted_at timestamp with time zone not null default now()
);

-- RLS: allow authenticated users full access, anon read/insert
alter table public.tasks enable row level security;

create policy "tasks_read" on public.tasks
  for select to anon, authenticated
  using (true);

create policy "tasks_insert" on public.tasks
  for insert to anon, authenticated
  with check (true);

create policy "tasks_update" on public.tasks
  for update to anon, authenticated
  using (true);

create policy "tasks_delete" on public.tasks
  for delete to anon, authenticated
  using (true);
