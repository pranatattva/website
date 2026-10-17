import config from "@/site.config";
import { courses } from "@/lib/courses";

const digits = (n) => String(n || "").replace(/[^\d+]/g, "");

// Central place for business details. Edit here and the whole site updates.
export const site = {
  name: "Pranatattva",
  fullName: "Pranatattva Pranic Healing Centre",
  tagline: "Heal • Transform • Align",
  description:
    "Pranatattva is a Pranic Healing centre in Baner, Pune offering healing sessions, Pranic Healing classes, meditations and free healing camps.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pranatattva.com",
  // Contact details come from site.config.js. Edit them there.
  email: config.email,
  phoneDisplay: config.callNumber,
  phoneHref: `tel:${digits(config.callNumber)}`,
  whatsappDisplay: config.whatsappNumber,
  whatsappHref: `https://wa.me/${digits(config.whatsappNumber).replace("+", "")}?text=${encodeURIComponent(config.whatsappMessage || "")}`,
  instagramHref: config.instagramUrl,
  instagramHandle: config.instagramHandle,
  adminEmail: config.adminEmail,
  address: {
    name: "Pranatattva Pranic Healing Centre",
    line1: "Office 412, 4th Floor, Ambrosia Galaxy",
    line2: "Baner, Pune – 411045",
  },
  mapsHref: "https://maps.app.goo.gl/GinKGk6K67WAmfAr9",
  mapEmbed:
    "https://www.google.com/maps?q=Ambrosia+Galaxy,+Baner,+Pune+411045&output=embed",
  // TODO: confirm centre hours
  hours: [
    { days: "Monday to Saturday", time: "10:00 am – 7:00 pm" },
    { days: "Sunday", time: "Healing camps and meditations only" },
  ],
};

export const shipping = { flatFee: 80, freeAbove: 999 };

// Build a WhatsApp chat link with a ready-typed message
export function waLink(message) {
  const n = String(config.whatsappNumber || "").replace(/[^\d]/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(message || config.whatsappMessage || "")}`;
}

// Home page hero text
export const hero = {
  eyebrow: "Heal • Transform • Align",
  headline: "Feel lighter, calmer and whole again",
  copy: "Gentle, no-touch Pranic Healing at our centre in Baner, Pune, or online wherever you are. Release what weighs on you and come back into balance.",
};

// Quote shown below the facts and figures on the home page.
// Please confirm the exact wording from Grand Master's books before going live.
export const masterQuote = {
  text: "Pranic Healing is a simple yet powerful and effective system of no-touch energy healing.",
  author: "Grand Master Choa Kok Sui",
};

// Combined figures shown in the highlight boxes on the Home and About pages.
export const centreStats = [
  { value: "10,550+", label: "Healing Sessions" },
  { value: "38+", label: "Healing Camps" },
  { value: "1,900+", label: "Lives Touched" },
  { value: "72+", label: "PH Intro Talks" },
];

export const healers = [
  {
    slug: "pragati-pullewar",
    name: "Pragati Pullewar",
    firstName: "Pragati",
    role: "Founder, Pranatattva",
    shortProfile: "Fine Artist, Entrepreneur & Associate Certified Pranic Healer",
    initials: "PP",
    photo: "", // e.g. "/images/pragati.jpg" after adding the photo to public/images
    // Three figures shown on the home page card
    stats: [
      { value: "9,500+", label: "Healing Sessions" },
      { value: "10+", label: "Years of Healing" },
      { value: "38+", label: "Healing Camps" },
    ],
    // Full set shown on the About page and her profile page
    allStats: [
      { value: "9,500+", label: "Healing Sessions" },
      { value: "10+", label: "Years of Healing" },
      { value: "38+", label: "Healing Camps" },
      { value: "1,900+", label: "Lives Touched" },
      { value: "72+", label: "PH Intro Talks" },
    ],
    summary:
      "A fine artist and former national-level athlete who found her purpose in Pranic Healing. Pragati has been healing full time since 2018 and founded Pranatattva as a warm, down-to-earth space to bring harmony back into people's lives.",
    credentials: [
      "Associate Certified Pranic Healer",
      "Certified Pranic Healer (in progress)",
      "Bachelor of Fine Arts",
      "Represented her state twice at the Women's National Hockey Championships",
      "Competed twice at the National Level in Rifle Shooting",
    ],
    timeline: [
      { year: "School years", text: "Represents her state twice at the Women's National Hockey Championships." },
      { year: "Design career", text: "Completes a Bachelor of Fine Arts and works for four years as a web designer." },
      { year: "2016", text: "Takes her first Basic Pranic Healing course during her competitive rifle-shooting years." },
      { year: "2018", text: "Leaves the corporate design world to practise Pranic Healing full time." },
      { year: "Today", text: "Founder of Pranatattva Pranic Healing Centre in Baner, Pune." },
    ],
    quote: "Healing isn't just about relieving discomfort. It's a beautiful process of recalibrating your entire life.",
    bio: [
      "Hi, I'm Pragati! My path to energy healing wasn't a straight line, but looking back, every step prepared me perfectly for what I do today.",
      "I've always been driven by a mix of deep creative curiosity and intense physical discipline. As a kid, that energy went straight into sports. I absolutely loved the grit and teamwork of hockey, eventually representing my state twice at the Women's National Hockey Championships during my school years. Later on, I pursued a Bachelor of Fine Arts and spent four years working as a web designer, blending art with technology.",
      "But even while working in design, my athletic drive didn't leave me. I picked up competitive rifle shooting and ended up competing twice at the National Level in Rifle Shooting.",
      "That intense era of competitive shooting actually brought me to a major turning point. In 2016, I took my very first Basic Pranic Healing Course, and it completely changed my perspective on wellness, focus and human potential. By 2018, I decided to leave the corporate design world behind to dive headfirst into healing. Since then I've been working full time in Pranic Healing.",
      "It was through this deep dive into energy work that I truly found my purpose. Pranic Healing completely transformed my own world first, showing me how to clear my blocks and bring my life into absolute alignment. Experiencing that shift firsthand sparked a genuine passion to help others do the same.",
      "For me, healing isn't just about relieving discomfort. It's a beautiful process of recalibrating your entire life. By clearing away the heavy energetic clutter we all carry, we can heal old wounds, transform your daily reality, and align your mind, body and spirit so you can live with true peace and vitality.",
      "This vision is exactly why I started Pranatattva Pranic Healing Centre: a warm, down-to-earth space where we can work together to bring harmony back to your life.",
    ],
  },
  {
    slug: "santosh-pullewar",
    name: "Santosh Pullewar",
    firstName: "Santosh",
    role: "Co-founder, Pranatattva",
    shortProfile: "Entrepreneur, Startup Mentor & Associate Certified Pranic Healer",
    initials: "SP",
    photo: "", // e.g. "/images/santosh.jpg"
    stats: [
      { value: "1,050+", label: "Healing Sessions" },
      { value: "10+", label: "Years of Healing" },
      { value: "38+", label: "Healing Camps" },
    ],
    allStats: [
      { value: "1,050+", label: "Healing Sessions" },
      { value: "10+", label: "Years of Healing" },
      { value: "16", label: "Years of Experience" },
      { value: "38+", label: "Healing Camps" },
      { value: "1,200+", label: "Lives Touched" },
    ],
    summary:
      "A former Assistant Professor in Management and startup mentor, Santosh sees Pranic Healing as a way of life. Guided by Grand Master Choa Kok Sui's teachings, he co-founded Pranatattva to help people find balance and a more harmonious life.",
    credentials: [
      "Associate Certified Pranic Healer",
      "15 years teaching, including as Assistant Professor in Management (MBA)",
      "Incubation Manager and startup mentor",
      "Guided by the Five Virtues of Arhatic Yoga",
    ],
    timeline: [
      { year: "Early years", text: "Finds joy in helping fellow students learn and grow." },
      { year: "Teaching", text: "Spends 15 years in education, including as an Assistant Professor in Management (MBA)." },
      { year: "Pranic Healing", text: "Enrols in the Basic Pranic Healing course and begins a practice of more than ten years." },
      { year: "Today", text: "Co-founder of Pranatattva, mentoring startups alongside his healing work." },
    ],
    quote: "Heal. Transform. Align. Beginning with ourselves, and extending that positive change to the world around us.",
    bio: [
      "Santosh's journey has always been guided by a natural desire to help others, learn new things and contribute to their growth. His early experiences of helping fellow students, and later working as an Assistant Professor in Management (MBA), strengthened his belief that true education is not just about knowledge, but also about becoming a better human being.",
      "His curiosity to explore new ways of improving lives led him to discover Pranic Healing. After learning about its principles, he decided to experience it for himself by enrolling in the Basic Pranic Healing course. That decision opened a new chapter in his life and gave him a deeper understanding of healing, self-development and service.",
      "For Santosh, Pranic Healing is much more than a healing technique; it is a way of life. The teachings of Grand Master Choa Kok Sui, especially the Five Virtues of Arhatic Yoga, inspire him to live simply, practise good values and keep working on himself.",
      "As the co-founder of Pranatattva, Santosh hopes to create a welcoming space where people can explore healing, discover greater balance and take steps towards a healthier, more harmonious life.",
      "For him, the essence of this journey is simple: Heal. Transform. Align. Beginning with ourselves, and extending that positive change to the world around us.",
    ],
  },
];

// Healing types shown on the Services page (and linked from the home page)
export const healingTypes = [
  { key: "physical", icon: "leaf", title: "Physical Healing", text: "Support for aches, illness, injuries and recovery, alongside your medical care." },
  { key: "psychological", icon: "mind", title: "Psychological Healing", text: "Relief from stress, anxiety, grief, anger, fears and unhelpful patterns." },
  { key: "relationship", icon: "link", title: "Relationship Healing", text: "Easing tension and old hurts between partners, family members and colleagues." },
  { key: "career", icon: "briefcase", title: "Job and Career Healing", text: "Clarity, confidence and momentum for work, interviews and career changes." },
  { key: "business", icon: "chart", title: "Business Healing", text: "Clearing energetic blocks around growth, teams, clients and finances." },
  { key: "home", icon: "home", title: "Home Cleansing", text: "Clearing heavy, stagnant energy from homes, offices and shops." },
  { key: "cellular", icon: "cell", title: "Cellular Healing", text: "Deep energy work at the level of the body's cells, to support renewal." },
  { key: "ancestral", icon: "tree", title: "Ancestral Healing", text: "Gently releasing patterns and burdens carried through the family line." },
  { key: "facial", icon: "face", title: "Pranic Facial", text: "A no-touch energy facial for a calmer mind and a fresher, rested look." },
  { key: "sculpting", icon: "figure", title: "Body Sculpting", text: "Energy work that supports your body-shaping goals, cravings and willpower." },
];

// Shown as placeholders on the home page until real testimonials are added
// in the admin dashboard (Testimonials).
export const testimonialPlaceholders = ["Physical Healing", "Psychological Healing", "Relationship Healing", "Business Healing", "Pranic Facial"];

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Master Choa Kok Sui", href: "/about/master-choa-kok-sui" },
      { label: "Pranic Healing", href: "/about/pranic-healing" },
      { label: "Pragati Pullewar", href: "/about/pragati-pullewar" },
      { label: "Santosh Pullewar", href: "/about/santosh-pullewar" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    label: "Courses",
    href: "/courses",
    children: courses.map((c) => ({ label: c.short, href: `/courses#${c.slug}` })),
  },
  {
    label: "Schedule",
    href: "/schedule",
    children: [
      { label: "Courses", href: "/schedule#courses" },
      { label: "Events", href: "/schedule#events" },
    ],
  },
  {
    label: "Services & Store",
    href: "/shop",
    children: [
      { label: "Healing services", href: "/shop#healings" },
      { label: "Oils and salts", href: "/shop#products", needsProducts: true },
    ],
  },
  { label: "Contact", href: "/contact" },
];
