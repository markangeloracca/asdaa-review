-- ENSF 607 Review: Supabase schema
-- Run once in Supabase → SQL Editor → New query → Run.

-- One JSON progress document per user (lesson steps, flashcard boxes, start date…)
create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade default auth.uid(),
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Every mock-exam attempt (kept forever so retakes show your improvement)
create table if not exists public.exam_attempts (
  id           text primary key,
  user_id      uuid not null references auth.users (id) on delete cascade default auth.uid(),
  exam_id      int  not null check (exam_id between 1 and 7),
  mode         text not null default 'full',
  score        int  not null,
  total        int  not null,
  answers      jsonb not null default '{}'::jsonb,
  question_ids jsonb,
  by_topic     jsonb not null default '{}'::jsonb,
  duration_sec int  not null default 0,
  created_at   timestamptz not null default now()
);
-- Safe to re-run on an older copy of this schema
alter table public.exam_attempts add column if not exists question_ids jsonb;

-- Widen the exam id range for existing databases (Mock Exam 7 = Study Guide 2)
alter table public.exam_attempts drop constraint if exists exam_attempts_exam_id_check;
alter table public.exam_attempts add constraint exam_attempts_exam_id_check check (exam_id between 1 and 7);

create index if not exists exam_attempts_user_idx on public.exam_attempts (user_id, exam_id, created_at desc);

-- Row Level Security: each signed-in user can only see and change their own rows
alter table public.progress      enable row level security;
alter table public.exam_attempts enable row level security;

drop policy if exists "own progress"  on public.progress;
drop policy if exists "own attempts"  on public.exam_attempts;

create policy "own progress" on public.progress
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "own attempts" on public.exam_attempts
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
