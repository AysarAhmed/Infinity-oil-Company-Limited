-- Run this ONCE in Supabase: SQL Editor > New query > paste > Run

create table if not exists public.reviews (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name)    between 2 and 60),
  branch      text          check (char_length(branch)  <= 40),
  rating      int  not null check (rating between 1 and 5),
  comment     text not null check (char_length(comment) between 10 and 600),
  approved    boolean not null default false
);

alter table public.reviews enable row level security;

-- Anyone may SEE only approved reviews
create policy "public read approved"
  on public.reviews for select
  to anon
  using (approved = true);

-- Anyone may SUBMIT a review, but it must start as NOT approved
create policy "public insert pending"
  on public.reviews for insert
  to anon
  with check (approved = false);
