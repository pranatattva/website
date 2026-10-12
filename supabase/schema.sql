-- Pranatattva database schema
-- Run this once in Supabase: SQL Editor > New query > paste > Run.

create extension if not exists "pgcrypto";

-- ---------- Admins ----------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------- Content ----------
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  level text,
  description text,
  start_date date not null,
  end_date date,
  time_text text,
  mode text default 'In-person',
  venue text,
  instructor text,
  fee integer default 0,
  seats integer,
  registration_url text,
  image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  time_text text,
  venue text,
  mode text default 'In-person',
  fee integer default 0,
  registration_url text,
  image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  category text,
  author text default 'Pranatattva',
  cover_url text,
  published_at date default current_date,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  category text not null default 'session' check (category in ('demo','session','package')),
  description text,
  duration text,
  sessions integer default 1,
  price integer not null default 0,
  features text[] default '{}',
  is_active boolean not null default true,
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  category text not null default 'Oils',
  description text,
  size text,
  price integer not null default 0,
  stock integer default 0,
  image_url text,
  is_active boolean not null default true,
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

-- ---------- Customer submissions ----------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services (id) on delete set null,
  service_name text,
  name text not null,
  email text not null,
  phone text not null,
  preferred_date date,
  preferred_time text,
  mode text,
  notes text,
  amount integer default 0,
  status text not null default 'pending'
    check (status in ('pending','awaiting_payment','confirmed','completed','cancelled')),
  admin_notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('product','service')),
  razorpay_order_id text unique,
  razorpay_payment_id text,
  status text not null default 'created'
    check (status in ('created','paid','failed','shipped','delivered','refunded','cancelled')),
  amount integer not null,            -- in paise
  currency text not null default 'INR',
  customer_name text,
  customer_email text,
  customer_phone text,
  shipping_address text,
  items jsonb not null default '[]',
  booking_id uuid references public.bookings (id) on delete set null,
  admin_notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- Row level security ----------
alter table public.admins   enable row level security;
alter table public.classes  enable row level security;
alter table public.events   enable row level security;
alter table public.posts    enable row level security;
alter table public.services enable row level security;
alter table public.products enable row level security;
alter table public.bookings enable row level security;
alter table public.orders   enable row level security;
alter table public.messages enable row level security;

-- Public can read published content
drop policy if exists "public read classes" on public.classes;
create policy "public read classes" on public.classes for select using (is_published or public.is_admin());
drop policy if exists "public read events" on public.events;
create policy "public read events" on public.events for select using (is_published or public.is_admin());
drop policy if exists "public read posts" on public.posts;
create policy "public read posts" on public.posts for select using (is_published or public.is_admin());
drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services for select using (is_active or public.is_admin());
drop policy if exists "public read products" on public.products;
create policy "public read products" on public.products for select using (is_active or public.is_admin());

-- Admins can do everything on content
do $$
declare t text;
begin
  foreach t in array array['classes','events','posts','services','products'] loop
    execute format('drop policy if exists "admin write %1$s" on public.%1$s', t);
    execute format('create policy "admin write %1$s" on public.%1$s for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
  foreach t in array array['bookings','orders','messages'] loop
    execute format('drop policy if exists "admin manage %1$s" on public.%1$s', t);
    execute format('create policy "admin manage %1$s" on public.%1$s for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Admins can see the admin list (to confirm their own access)
drop policy if exists "admins read self" on public.admins;
create policy "admins read self" on public.admins for select using (user_id = auth.uid());

-- Bookings, orders and messages are inserted by the site's API routes using the
-- service role key, so no public insert policies are needed.

-- ---------- Image storage ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "admin upload media" on storage.objects;
create policy "admin upload media" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "admin update media" on storage.objects;
create policy "admin update media" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());

-- ---------- Make yourself an admin ----------
-- 1. Supabase > Authentication > Users > Add user (email + password).
-- 2. Then run, with that email:
--    insert into public.admins (user_id)
--    select id from auth.users where email = 'info@pranatattva.com';
