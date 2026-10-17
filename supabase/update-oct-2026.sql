-- ================================================================
--  Pranatattva update (October 2026). Run ONCE in Supabase > SQL Editor.
--  Safe to run again: it only adds what is missing.
-- ================================================================

-- Prices are optional now (empty = "Message us on WhatsApp")
alter table public.services alter column price drop not null;
alter table public.products alter column price drop not null;

-- Discounted price for products
alter table public.products add column if not exists sale_price integer;

-- "Past" switch for courses and events
alter table public.classes add column if not exists is_past boolean not null default false;
alter table public.events  add column if not exists is_past boolean not null default false;

-- Gallery (in case it wasn't created yet)
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
create policy "public read gallery" on public.gallery for select using (is_published or public.is_admin());
drop policy if exists "admin write gallery" on public.gallery;
create policy "admin write gallery" on public.gallery for all using (public.is_admin()) with check (public.is_admin());

-- Testimonials (9:16 screenshots)
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  category text,
  name text,
  sort_order integer default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select using (is_published or public.is_admin());
drop policy if exists "admin write testimonials" on public.testimonials;
create policy "admin write testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

-- New blog posts: Pranic Facial and Body Sculpting
insert into public.posts (title, slug, excerpt, content, category, author, cover_url, published_at, is_published) values
  ('Pranic Facial: a no-touch facial for the face and the mind', 'pranic-facial', 'No creams, no massage, no chemicals. A Pranic Facial works on the energy of the face to release stress and leave you looking and feeling rested. Here''s what happens in a session.', 'Most facials work from the outside in: cleansers, steam, massage, masks. A Pranic Facial works the other way round. It uses prana, the life energy that keeps us alive, to clear and refresh the energy of the face, so that tiredness and tension have less to hold on to.

## Where it comes from

Pranic Facial grows out of Pranic Healing, the no-touch energy healing system developed by Grand Master Choa Kok Sui. The underlying idea is the same one behind every Pranic Healing session: when used-up, heavy energy is cleared away and fresh prana is supplied, the body is better able to restore itself.

Healers who offer facial and body work learn it as a specialised application of Pranic Healing, after completing the Basic, Advanced, Pranic Psychotherapy and Pranic Crystal Healing courses. It''s a technique that builds on years of practice.

## What happens in a session

- You sit or lie down comfortably, fully clothed. Nothing is applied to your skin, and there is no touch.
- Your healer scans the energy around your face, head and the chakras that relate to the skin and to stress.
- Congested energy is gently swept away. Some healers use a cleansed, programmed crystal as a tool.
- Fresh prana is projected to the face and the related energy centres, then stabilised.
- Emotional tension that tends to show on the face, such as worry, irritation or fatigue, is addressed at the same time.

## What people notice

Most people find the session deeply relaxing. Afterwards they often describe feeling lighter and calmer, sleeping better that night, and looking more rested. Stress shows on the face quickly, and so does relief from it.

## What it isn''t

> A Pranic Facial is a complementary wellness practice. It is not a medical or dermatological treatment, and no honest healer will promise to turn back the clock.

If you have a skin condition, keep seeing your dermatologist. Pranic Healing works alongside medical care, never instead of it.

## Make the most of it

- Drink plenty of water before and after your session.
- Take a salt water bath that evening to support the cleansing.
- Book a short series of sessions if you''d like to see a steadier change.
- Look after the basics: sleep, sun protection and a simple skincare routine.

## Curious?

Message us on WhatsApp to ask about Pranic Facial sessions at our centre in Baner, Pune.', 'Healing', 'Pranatattva', null, '2026-10-16', true),
  ('Pranic Body Sculpting: working with the energy behind cravings', 'pranic-body-sculpting', 'Weight and body shape are rarely just about food. Pranic Body Sculpting addresses the emotional and energetic patterns behind cravings, comfort eating and low willpower.', 'Anyone who has tried to change their body knows that knowing what to do is the easy part. The hard part is the 10 pm craving, the stressful week that undoes a month of effort, or the feeling of running out of willpower. Pranic Body Sculpting is designed to help with exactly that part.

## What is Pranic Body Sculpting?

It is a specialised application of Pranic Healing, the no-touch energy healing system developed by Grand Master Choa Kok Sui. Rather than replacing diet and exercise, it works on the energy body to support them: easing cravings, releasing the emotions that drive overeating, and strengthening your resolve.

Like Pranic Facial, it is taught to experienced healers after the Basic, Advanced, Pranic Psychotherapy and Pranic Crystal Healing courses.

## The idea behind it

In Pranic Healing, every chakra is linked to particular organs and to particular emotions and qualities. When certain centres are congested or out of balance, it shows up as patterns many of us recognise:

- Strong cravings, especially for sugar
- Eating for comfort when stressed, sad or bored
- Trouble sticking to plans despite good intentions
- Sluggish energy and low motivation to move

Body Sculpting sessions focus on cleansing and balancing these areas, and on releasing the stress and emotional heaviness that feed the cycle.

## What happens in a session

- A short conversation about your goals and what tends to get in the way.
- A no-touch scan of your energy body, with you fully clothed and relaxed.
- Cleansing and energising of the relevant chakras and areas of the body.
- Pranic Psychotherapy techniques to release emotional patterns linked to eating.
- Simple guidance to support you between sessions.

## Setting honest expectations

> Body Sculpting supports healthy habits. It does not replace them, and it is not a medical weight-loss treatment.

Results depend on many things, including your food, sleep, activity and health. Many people find that with cravings and stress eased, the healthy choices they already wanted to make simply become easier. If you have a medical condition, or are on medication that affects weight, please keep your doctor involved.

## Who it''s for

People who know what they want to change but keep getting stuck, emotional eaters, and anyone starting a fitness or nutrition plan who would like extra support.

## Begin with a conversation

Message us on WhatsApp and we''ll talk through whether Body Sculpting sessions are a good fit for you.', 'Healing', 'Pranatattva', null, '2026-10-17', true)
on conflict (slug) do nothing;
