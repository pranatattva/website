-- Gallery: run this ONCE in Supabase > SQL Editor (needed for the new Gallery page).

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  album text,
  taken_on date,
  sort_order integer default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.gallery enable row level security;

drop policy if exists "public read gallery" on public.gallery;
create policy "public read gallery" on public.gallery
  for select using (is_published or public.is_admin());

drop policy if exists "admin write gallery" on public.gallery;
create policy "admin write gallery" on public.gallery
  for all using (public.is_admin()) with check (public.is_admin());
