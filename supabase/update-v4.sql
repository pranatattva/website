-- ================================================================
--  Pranatattva v4 update. Run ONCE in Supabase > SQL Editor.
--  Adds a "Google link" (Maps location, Google Form or Meet) to courses and events.
-- ================================================================
alter table public.classes add column if not exists google_link text;
alter table public.events  add column if not exists google_link text;
