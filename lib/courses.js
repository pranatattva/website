// Course details for the Courses page. Edit freely.
// "match" words link a course to batches you add under Courses in the admin dashboard.

// A scheduled batch appears on the Courses page this many days before it starts
export const BATCH_WINDOW_DAYS = 45;

export const courses = [
  {
    slug: "basic-pranic-healing",
    name: "Basic Pranic Healing",
    short: "Basic Pranic Healing",
    level: "Level 1",
    duration: "2 days",
    prerequisite: "Age 16 and above",
    match: ["basic"],
    summary:
      "The foundation course and the starting point for every other course. In two days you learn to feel energy, scan the aura, and give simple, effective healings to yourself and your family.",
    learn: [
      "How to sensitise your hands and feel the energy body, or aura",
      "The 11 major chakras and how they relate to your organs and emotions",
      "Scanning, cleansing (sweeping) and energising, and how to stabilise a healing so it lasts",
      "Step-by-step protocols for common ailments such as headaches, sinusitis, coughs, colds and body pain",
      "Preventive healing: clearing an energy imbalance before it settles in the body",
      "Self-healing, and distant healing for loved ones who aren't with you",
      "Energy hygiene: salt water baths, exercise and simple daily habits",
      "The Meditation on Twin Hearts",
    ],
    forWhom: "Beginners, parents, caregivers, and health and wellness professionals.",
  },
  {
    slug: "advanced-pranic-healing",
    name: "Advanced Pranic Healing",
    short: "Advanced Pranic Healing",
    level: "Level 2",
    duration: "",
    prerequisite: "Basic Pranic Healing",
    match: ["advanced"],
    summary:
      "Learn to heal with colour pranas for faster, deeper and more precise results, building directly on the Basic course techniques.",
    learn: [
      "The colour pranas (green, orange, red, yellow, blue and violet) and what each one does",
      "Choosing the right colour combinations safely for different conditions",
      "More advanced scanning and faster healing techniques",
      "Protocols for more serious and long-standing conditions, as a complement to medical care",
      "An introduction to healing with violet and electric violet prana",
      "Safety guidelines so healing is effective and gentle",
    ],
    forWhom: "Pranic Healers who want to heal more effectively.",
  },
  {
    slug: "pranic-psychotherapy",
    name: "Pranic Psychotherapy",
    short: "Pranic Psychotherapy",
    level: "Level 3",
    duration: "",
    prerequisite: "Basic and Advanced Pranic Healing",
    match: ["psychotherapy"],
    summary:
      "Apply Pranic Healing to emotional and psychological wellbeing, quickly and safely releasing the heavy thoughts and emotions held in the energy body.",
    learn: [
      "How to identify, cleanse and release the negative emotional and thought energies behind stress, irritability, anxiety and grief",
      "Techniques for phobias, obsessions, compulsions, addictions and low mood",
      "Healing traumatic memories and unhelpful habits",
      "Prevention, and healing through affirmation",
      "Shielding and protecting the aura and chakras",
      "Cleansing yourself as a healer, and cleansing objects and spaces",
    ],
    forWhom: "Healers, counsellors, therapists, teachers and parents.",
  },
  {
    slug: "achieving-oneness-with-the-higher-soul",
    name: "Achieving Oneness with the Higher Soul",
    short: "Oneness with the Higher Soul",
    level: "Soul Course",
    duration: "",
    prerequisite: "Age 16 and above",
    match: ["oneness", "higher soul", "soul course"],
    summary:
      "A meditative course on soul realisation: the conscious union of your incarnated soul with your Higher Soul, for greater clarity, purpose and inner peace.",
    learn: [
      "The nature of the soul: the incarnated soul and the Higher Soul",
      "Energetic seeds and imprints in the aura, and how they shape your life",
      "Strengthening the antahkarana, the spiritual bridge to your Higher Soul",
      "A deeper understanding of the Meditation on Twin Hearts",
      "Meditation techniques for soul realisation",
      "Developing intuition and inner guidance",
    ],
    forWhom: "Anyone ready to deepen their meditation and spiritual practice.",
  },
  {
    slug: "arhatic-yoga",
    name: "Arhatic Yoga Preparatory",
    short: "Arhatic Yoga",
    level: "Spiritual practice",
    duration: "2 days",
    prerequisite: "Basic, Advanced, Pranic Psychotherapy and Soul Course",
    match: ["arhatic"],
    summary:
      "Known as the yoga of synthesis, Arhatic Yoga brings together the essence of the major yoga paths into a safe, systematic practice for faster spiritual growth.",
    learn: [
      "The five pillars for safe, balanced spiritual development",
      "Methods to purify the physical and subtle bodies",
      "Releasing unwanted habits and negative emotions",
      "Character building through the five virtues",
      "Advanced meditations to activate the chakras safely, and the do's and don'ts that prevent spiritual crisis",
      "Practices for a stronger aura and greater healing ability",
    ],
    forWhom: "Pranic Healers committed to regular spiritual practice.",
  },
];

export function matchCourse(title = "") {
  const t = title.toLowerCase();
  return courses.find((c) => c.match.some((m) => t.includes(m)));
}
