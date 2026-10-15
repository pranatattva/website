// Sample content shown until Supabase is connected (and used to generate supabase/seed.sql).
// Prices are placeholders in rupees.

export const classes = [
  {
    id: "c-basic",
    title: "Basic Pranic Healing (Level 1)",
    level: "Beginner",
    description:
      "The foundation course. Learn to feel energy, scan the aura, cleanse and energise, and give simple healings to yourself and your family. No prior experience needed.",
    start_date: "2026-11-07",
    end_date: "2026-11-08",
    time_text: "9:30 am – 5:30 pm",
    mode: "In-person",
    venue: "Pranatattva centre, Baner",
    instructor: "Pragati Pullewar",
    fee: 8500,
    seats: 24,
    registration_url: "",
    image_url: "",
    is_published: true,
  },
  {
    id: "c-advanced",
    title: "Advanced Pranic Healing",
    level: "After Level 1",
    description:
      "Work with colour pranas for faster, more precise healing. Builds directly on the Basic course protocols.",
    start_date: "2026-11-21",
    end_date: "2026-11-22",
    time_text: "9:30 am – 5:30 pm",
    mode: "In-person",
    venue: "Pranatattva centre, Baner",
    instructor: "Santosh Pullewar",
    fee: 9500,
    seats: 20,
    registration_url: "",
    image_url: "",
    is_published: true,
  },
  {
    id: "c-psycho",
    title: "Pranic Psychotherapy",
    level: "After Advanced",
    description:
      "Techniques for releasing stress, anxiety, grief and unhelpful emotional patterns held in the energy body.",
    start_date: "2026-12-05",
    end_date: "2026-12-06",
    time_text: "9:30 am – 5:30 pm",
    mode: "Hybrid",
    venue: "Pranatattva centre, Baner and online",
    instructor: "Pragati Pullewar",
    fee: 11000,
    seats: 20,
    registration_url: "",
    image_url: "",
    is_published: true,
  },
  {
    id: "c-crystal",
    title: "Pranic Crystal Healing",
    level: "After Level 1",
    description:
      "How to select, cleanse, programme and use crystals as healing tools, including the healing wand.",
    start_date: "2026-12-19",
    end_date: "2026-12-19",
    time_text: "10:00 am – 6:00 pm",
    mode: "In-person",
    venue: "Pranatattva centre, Baner",
    instructor: "Santosh Pullewar",
    fee: 6500,
    seats: 20,
    registration_url: "",
    image_url: "",
    is_published: true,
  },
];

export const events = [
  {
    id: "e-camp-oct",
    title: "Free Pranic Healing camp",
    description:
      "Walk in for a free 20-minute healing session with our trained healers. Open to everyone, no booking required.",
    event_date: "2026-10-25",
    time_text: "10:00 am – 1:00 pm",
    venue: "Pranatattva centre, Baner",
    mode: "In-person",
    fee: 0,
    registration_url: "",
    image_url: "",
    is_published: true,
  },
  {
    id: "e-fullmoon-oct",
    title: "Full moon Twin Hearts meditation",
    description:
      "A guided group meditation for peace and illumination. Join in person or on Zoom. Free, all are welcome.",
    event_date: "2026-10-26",
    time_text: "7:00 pm – 8:00 pm",
    venue: "Pranatattva centre, Baner and Zoom",
    mode: "Hybrid",
    fee: 0,
    registration_url: "",
    image_url: "",
    is_published: true,
  },
  {
    id: "e-kids",
    title: "Super Brain Yoga for children",
    description:
      "A playful Children's Day workshop teaching a simple exercise to help children feel calm and focused. Ages 6 to 14.",
    event_date: "2026-11-14",
    time_text: "11:00 am – 12:30 pm",
    venue: "Pranatattva centre, Baner",
    mode: "In-person",
    fee: 500,
    registration_url: "",
    image_url: "",
    is_published: true,
  },
  {
    id: "e-stress",
    title: "Talk: energy hygiene for busy professionals",
    description:
      "A 90-minute introduction to simple daily practices for clearing stress, with a short guided meditation.",
    event_date: "2026-12-12",
    time_text: "6:30 pm – 8:00 pm",
    venue: "Online",
    mode: "Online",
    fee: 0,
    registration_url: "",
    image_url: "",
    is_published: true,
  },
];

export const services = [
  {
    id: "s-discovery",
    name: "Free discovery call",
    slug: "free-discovery-call",
    category: "demo",
    description:
      "A short call to understand what you're going through and whether Pranic Healing is a good fit. No obligation.",
    duration: "15 minutes",
    sessions: 1,
    price: 0,
    features: ["Phone or video call", "Ask any questions", "Get a suggested plan"],
    is_active: true,
    sort_order: 1,
  },
  {
    id: "s-session",
    name: "Pranic Healing session",
    slug: "pranic-healing-session",
    category: "session",
    description:
      "A one-to-one healing for physical discomfort, stress or low energy. In person at Baner or by distance.",
    duration: "60 minutes",
    sessions: 1,
    price: 1500,
    features: ["Energy scan and assessment", "Cleansing and energising", "Self-care guidance"],
    is_active: true,
    sort_order: 2,
  },
  {
    id: "s-psycho",
    name: "Pranic Psychotherapy session",
    slug: "pranic-psychotherapy-session",
    category: "session",
    description:
      "Focused healing for emotional heaviness, anxiety, grief, habits and relationship stress.",
    duration: "75 minutes",
    sessions: 1,
    price: 2200,
    features: ["Detailed consultation", "Emotional energy release", "Follow-up suggestions"],
    is_active: true,
    sort_order: 3,
  },
  {
    id: "s-distance",
    name: "Distance healing session",
    slug: "distance-healing-session",
    category: "session",
    description:
      "Receive healing wherever you are. We connect on a call before and after the session.",
    duration: "45 minutes",
    sessions: 1,
    price: 1200,
    features: ["Anywhere in the world", "Short call before and after", "Ideal for elders and children"],
    is_active: true,
    sort_order: 4,
  },
  {
    id: "s-pack-5",
    name: "Renewal package",
    slug: "renewal-package",
    category: "package",
    description:
      "Five healing sessions over five to six weeks for steady, lasting change.",
    duration: "5 sessions",
    sessions: 5,
    price: 6500,
    features: ["Save ₹1,000", "In person or distance", "Valid for 3 months"],
    is_active: true,
    sort_order: 5,
  },
  {
    id: "s-pack-10",
    name: "Deep healing package",
    slug: "deep-healing-package",
    category: "package",
    description:
      "Ten sessions for long-standing physical or emotional concerns, with a progress review midway.",
    duration: "10 sessions",
    sessions: 10,
    price: 12000,
    features: ["Save ₹3,000", "Midway progress review", "Valid for 6 months"],
    is_active: true,
    sort_order: 6,
  },
];

export const products = [
  {
    id: "p-lavender",
    name: "Lavender essential oil",
    slug: "lavender-essential-oil",
    category: "Oils",
    description: "Pure lavender oil for a calming room diffuser or a few drops in a bath.",
    size: "15 ml",
    price: 450,
    stock: 40,
    image_url: "",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "p-eucalyptus",
    name: "Eucalyptus essential oil",
    slug: "eucalyptus-essential-oil",
    category: "Oils",
    description: "Fresh, clearing eucalyptus oil, often used to refresh a healing space.",
    size: "15 ml",
    price: 420,
    stock: 40,
    image_url: "",
    is_active: true,
    sort_order: 2,
  },
  {
    id: "p-aura-blend",
    name: "Aura cleansing oil blend",
    slug: "aura-cleansing-oil-blend",
    category: "Oils",
    description: "Our house blend of lavender, eucalyptus and tea tree in a roll-on bottle.",
    size: "10 ml roll-on",
    price: 650,
    stock: 30,
    image_url: "",
    is_active: true,
    sort_order: 3,
  },
  {
    id: "p-sea-salt",
    name: "Cleansing sea salt",
    slug: "cleansing-sea-salt",
    category: "Salts",
    description: "Coarse sea salt for salt water baths and for cleansing crystals.",
    size: "500 g",
    price: 250,
    stock: 60,
    image_url: "",
    is_active: true,
    sort_order: 4,
  },
  {
    id: "p-pink-salt",
    name: "Himalayan pink bath salt",
    slug: "himalayan-pink-bath-salt",
    category: "Salts",
    description: "Mineral-rich pink salt for a relaxing evening soak.",
    size: "1 kg",
    price: 390,
    stock: 50,
    image_url: "",
    is_active: true,
    sort_order: 5,
  },
  {
    id: "p-bath-kit",
    name: "Salt water bath kit",
    slug: "salt-water-bath-kit",
    category: "Salts",
    description: "Sea salt and the aura cleansing blend together, with a printed guide.",
    size: "500 g salt + 10 ml oil",
    price: 799,
    stock: 25,
    image_url: "",
    is_active: true,
    sort_order: 6,
  },
];

export const posts = [
  {
    id: "b-what-is",
    title: "What is Pranic Healing? A gentle introduction",
    slug: "what-is-pranic-healing",
    excerpt:
      "A no-touch, drug-free way of working with the body's own life energy. Here is what happens in a session and what to expect.",
    category: "Basics",
    author: "Pranatattva",
    cover_url: "",
    published_at: "2026-09-18",
    is_published: true,
    content: `Prana is the Sanskrit word for life energy. The same idea appears in many traditions as qi, ki or mana. Pranic Healing is a system that works with this energy to support the body's natural ability to heal itself.

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

The easiest start is a free discovery call. We'll listen, answer your questions and suggest whether a session, a package or a class would help you most.`,
  },
  {
    id: "b-twin-hearts",
    title: "Why we meditate together on full moon nights",
    slug: "full-moon-twin-hearts-meditation",
    excerpt:
      "The Meditation on Twin Hearts is a simple guided practice for peace. Doing it in a group on the full moon is a monthly tradition at our centre.",
    category: "Meditation",
    author: "Pranatattva",
    cover_url: "",
    published_at: "2026-09-30",
    is_published: true,
    content: `The Meditation on Twin Hearts was taught by Grand Master Choa Kok Sui as a practice for blessing the earth with loving-kindness and inner peace. It takes about twenty minutes and is guided from start to finish, so it is easy for beginners.

## Why a group?

Many people find it easier to settle into meditation when they sit with others. The shared intention helps the mind quieten more quickly, and regulars tell us the group sessions feel noticeably deeper than practising alone.

## Why the full moon?

In the Pranic Healing tradition, full moon days are considered especially supportive for meditation. Practitioners around the world meditate together on these evenings, and we keep the same rhythm here in Baner.

## What to bring

> Nothing at all. Wear comfortable clothes, arrive five minutes early, and leave your phone on silent.

## Joining online

Can't make it to the centre? Every full moon meditation is also streamed on Zoom. Check the events page for the next date and the joining link.`,
  },
  {
    id: "b-salt-bath",
    title: "Salt water baths: a simple ritual for energy hygiene",
    slug: "salt-water-bath-energy-hygiene",
    excerpt:
      "Just as we wash the physical body daily, the energy body benefits from regular cleansing. A salt water bath is the easiest place to start.",
    category: "Self-care",
    author: "Pranatattva",
    cover_url: "",
    published_at: "2026-10-08",
    is_published: true,
    content: `After a long day of meetings, travel or difficult conversations, many of us feel heavy in a way a good night's sleep doesn't quite fix. In Pranic Healing we describe this as energetic congestion, and salt is one of the simplest tools for clearing it.

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

The salt does its work either way, but treating the bath as a pause rather than a chore makes a difference. Breathe slowly, put your phone in another room, and notice how you feel afterwards.`,
  },
];

// Shown in the "Past" tab before Supabase is connected
export const pastClasses = [
  {
    id: "pc-basic-aug",
    title: "Basic Pranic Healing (Level 1)",
    level: "Beginner",
    description: "Our August batch of the foundation course.",
    start_date: "2026-08-22",
    end_date: "2026-08-23",
    time_text: "9:30 am – 5:30 pm",
    mode: "In-person",
    venue: "Pranatattva centre, Baner",
    instructor: "",
    fee: 8500,
    is_published: true,
  },
];

export const pastEvents = [
  {
    id: "pe-fullmoon-sep",
    title: "Full moon Twin Hearts meditation",
    description: "Monthly group meditation for peace and illumination.",
    event_date: "2026-09-26",
    time_text: "7:00 pm – 8:00 pm",
    venue: "Pranatattva centre, Baner and Zoom",
    mode: "Hybrid",
    fee: 0,
    is_published: true,
  },
  {
    id: "pe-camp-sep",
    title: "Free Pranic Healing camp",
    description: "Walk-in healing camp open to everyone.",
    event_date: "2026-09-13",
    time_text: "10:00 am – 1:00 pm",
    venue: "Pranatattva centre, Baner",
    mode: "In-person",
    fee: 0,
    is_published: true,
  },
];
