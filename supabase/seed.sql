-- Sample content. Run after schema.sql. Safe to edit or delete later from the admin dashboard.

insert into public.classes (title, level, description, start_date, end_date, time_text, mode, venue, instructor, fee, seats, registration_url, image_url, is_published) values
  ('Basic Pranic Healing (Level 1)', 'Beginner', 'The foundation course. Learn to feel energy, scan the aura, cleanse and energise, and give simple healings to yourself and your family. No prior experience needed.', '2026-11-07', '2026-11-08', '9:30 am – 5:30 pm', 'In-person', 'Pranatattva centre, Baner', 'Pragati Pullewar', 8500, 24, null, null, true),
  ('Advanced Pranic Healing', 'After Level 1', 'Work with colour pranas for faster, more precise healing. Builds directly on the Basic course protocols.', '2026-11-21', '2026-11-22', '9:30 am – 5:30 pm', 'In-person', 'Pranatattva centre, Baner', 'Santosh Pullewar', 9500, 20, null, null, true),
  ('Pranic Psychotherapy', 'After Advanced', 'Techniques for releasing stress, anxiety, grief and unhelpful emotional patterns held in the energy body.', '2026-12-05', '2026-12-06', '9:30 am – 5:30 pm', 'Hybrid', 'Pranatattva centre, Baner and online', 'Pragati Pullewar', 11000, 20, null, null, true),
  ('Pranic Crystal Healing', 'After Level 1', 'How to select, cleanse, programme and use crystals as healing tools, including the healing wand.', '2026-12-19', '2026-12-19', '10:00 am – 6:00 pm', 'In-person', 'Pranatattva centre, Baner', 'Santosh Pullewar', 6500, 20, null, null, true);

insert into public.events (title, description, event_date, time_text, venue, mode, fee, registration_url, image_url, is_published) values
  ('Free Pranic Healing camp', 'Walk in for a free 20-minute healing session with our trained healers. Open to everyone, no booking required.', '2026-10-25', '10:00 am – 1:00 pm', 'Pranatattva centre, Baner', 'In-person', 0, null, null, true),
  ('Full moon Twin Hearts meditation', 'A guided group meditation for peace and illumination. Join in person or on Zoom. Free, all are welcome.', '2026-10-26', '7:00 pm – 8:00 pm', 'Pranatattva centre, Baner and Zoom', 'Hybrid', 0, null, null, true),
  ('Super Brain Yoga for children', 'A playful Children''s Day workshop teaching a simple exercise to help children feel calm and focused. Ages 6 to 14.', '2026-11-14', '11:00 am – 12:30 pm', 'Pranatattva centre, Baner', 'In-person', 500, null, null, true),
  ('Talk: energy hygiene for busy professionals', 'A 90-minute introduction to simple daily practices for clearing stress, with a short guided meditation.', '2026-12-12', '6:30 pm – 8:00 pm', 'Online', 'Online', 0, null, null, true);

insert into public.services (name, slug, category, description, duration, sessions, price, features, is_active, sort_order) values
  ('Free discovery call', 'free-discovery-call', 'demo', 'A short call to understand what you''re going through and whether Pranic Healing is a good fit. No obligation.', '15 minutes', 1, 0, array['Phone or video call', 'Ask any questions', 'Get a suggested plan']::text[], true, 1),
  ('Pranic Healing session', 'pranic-healing-session', 'session', 'A one-to-one healing for physical discomfort, stress or low energy. In person at Baner or by distance.', '60 minutes', 1, 1500, array['Energy scan and assessment', 'Cleansing and energising', 'Self-care guidance']::text[], true, 2),
  ('Pranic Psychotherapy session', 'pranic-psychotherapy-session', 'session', 'Focused healing for emotional heaviness, anxiety, grief, habits and relationship stress.', '75 minutes', 1, 2200, array['Detailed consultation', 'Emotional energy release', 'Follow-up suggestions']::text[], true, 3),
  ('Distance healing session', 'distance-healing-session', 'session', 'Receive healing wherever you are. We connect on a call before and after the session.', '45 minutes', 1, 1200, array['Anywhere in the world', 'Short call before and after', 'Ideal for elders and children']::text[], true, 4),
  ('Renewal package', 'renewal-package', 'package', 'Five healing sessions over five to six weeks for steady, lasting change.', '5 sessions', 5, 6500, array['Save ₹1,000', 'In person or distance', 'Valid for 3 months']::text[], true, 5),
  ('Deep healing package', 'deep-healing-package', 'package', 'Ten sessions for long-standing physical or emotional concerns, with a progress review midway.', '10 sessions', 10, 12000, array['Save ₹3,000', 'Midway progress review', 'Valid for 6 months']::text[], true, 6);

insert into public.products (name, slug, category, description, size, price, stock, image_url, is_active, sort_order) values
  ('Lavender essential oil', 'lavender-essential-oil', 'Oils', 'Pure lavender oil for a calming room diffuser or a few drops in a bath.', '15 ml', 450, 40, null, true, 1),
  ('Eucalyptus essential oil', 'eucalyptus-essential-oil', 'Oils', 'Fresh, clearing eucalyptus oil, often used to refresh a healing space.', '15 ml', 420, 40, null, true, 2),
  ('Aura cleansing oil blend', 'aura-cleansing-oil-blend', 'Oils', 'Our house blend of lavender, eucalyptus and tea tree in a roll-on bottle.', '10 ml roll-on', 650, 30, null, true, 3),
  ('Cleansing sea salt', 'cleansing-sea-salt', 'Salts', 'Coarse sea salt for salt water baths and for cleansing crystals.', '500 g', 250, 60, null, true, 4),
  ('Himalayan pink bath salt', 'himalayan-pink-bath-salt', 'Salts', 'Mineral-rich pink salt for a relaxing evening soak.', '1 kg', 390, 50, null, true, 5),
  ('Salt water bath kit', 'salt-water-bath-kit', 'Salts', 'Sea salt and the aura cleansing blend together, with a printed guide.', '500 g salt + 10 ml oil', 799, 25, null, true, 6);

insert into public.posts (title, slug, excerpt, content, category, author, cover_url, published_at, is_published) values
  ('What is Pranic Healing? A gentle introduction', 'what-is-pranic-healing', 'A no-touch, drug-free way of working with the body''s own life energy. Here is what happens in a session and what to expect.', 'Prana is the Sanskrit word for life energy. The same idea appears in many traditions as qi, ki or mana. Pranic Healing is a system that works with this energy to support the body''s natural ability to heal itself.

## Why no touch?

The healer works on the energy body, sometimes called the aura, which surrounds and interpenetrates the physical body. Because of this, there is no physical contact during a session. You stay fully clothed and simply sit or lie comfortably.

## What happens in a session

- The healer first scans your energy field with their hands to feel where energy is congested or depleted.
- Congested, used-up energy is gently removed. We call this cleansing.
- Fresh prana is then projected to the areas that need it. We call this energising.
- Finally the healed areas are stabilised so the benefit lasts.

Most people feel calm and lighter during the session. Some feel warmth, coolness or tingling. Others feel nothing in particular and notice the difference later.

## Is it a replacement for medicine?

No. Pranic Healing is complementary. It works alongside medical treatment, never instead of it. We always encourage you to keep seeing your doctor.

## How to begin

The easiest start is a free discovery call. We''ll listen, answer your questions and suggest whether a session, a package or a class would help you most.', 'Basics', 'Pranatattva', null, '2026-09-18', true),
  ('Why we meditate together on full moon nights', 'full-moon-twin-hearts-meditation', 'The Meditation on Twin Hearts is a simple guided practice for peace. Doing it in a group on the full moon is a monthly tradition at our centre.', 'The Meditation on Twin Hearts was taught by Grand Master Choa Kok Sui as a practice for blessing the earth with loving-kindness and inner peace. It takes about twenty minutes and is guided from start to finish, so it is easy for beginners.

## Why a group?

Many people find it easier to settle into meditation when they sit with others. The shared intention helps the mind quieten more quickly, and regulars tell us the group sessions feel noticeably deeper than practising alone.

## Why the full moon?

In the Pranic Healing tradition, full moon days are considered especially supportive for meditation. Practitioners around the world meditate together on these evenings, and we keep the same rhythm here in Baner.

## What to bring

> Nothing at all. Wear comfortable clothes, arrive five minutes early, and leave your phone on silent.

## Joining online

Can''t make it to the centre? Every full moon meditation is also streamed on Zoom. Check the events page for the next date and the joining link.', 'Meditation', 'Pranatattva', null, '2026-09-30', true),
  ('Salt water baths: a simple ritual for energy hygiene', 'salt-water-bath-energy-hygiene', 'Just as we wash the physical body daily, the energy body benefits from regular cleansing. A salt water bath is the easiest place to start.', 'After a long day of meetings, travel or difficult conversations, many of us feel heavy in a way a good night''s sleep doesn''t quite fix. In Pranic Healing we describe this as energetic congestion, and salt is one of the simplest tools for clearing it.

## The basic method

- Dissolve a handful of coarse sea salt in a bucket of warm water.
- Add a few drops of lavender or eucalyptus oil if you like.
- After your usual bath, pour the salt water over your body from the neck down and rest for a few minutes.
- Rinse with plain water and dry off.

## How often?

Once or twice a week is plenty for most people. Healers and caregivers who work closely with others often do it more frequently.

## A note on skin

Rinse well afterwards and skip the salt bath if you have broken or sensitive skin. If in doubt, check with your doctor first.

## Make it a ritual

The salt does its work either way, but treating the bath as a pause rather than a chore makes a difference. Breathe slowly, put your phone in another room, and notice how you feel afterwards.', 'Self-care', 'Pranatattva', null, '2026-10-08', true);
