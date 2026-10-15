import config from "@/site.config";

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

// Combined figures shown in the highlight boxes on the Home and About pages.
export const centreStats = [
  { value: "10,550+", label: "Healing sessions given" },
  { value: "38+", label: "Healing camps organised" },
  { value: "1,900+", label: "Lives touched" },
  { value: "72+", label: "Pranic Healing intro talks" },
];
export const centreStatsNote =
  "Lives touched counts the people who attended our Pranic Healing talks and healing camps.";

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
      { value: "9,500+", label: "Healing sessions" },
      { value: "9", label: "Years of healing" },
      { value: "38+", label: "Healing camps" },
    ],
    // Full set shown on the About page and her profile page
    allStats: [
      { value: "9,500+", label: "Healing sessions" },
      { value: "13", label: "Years of experience", note: "9 in healing, 4 corporate" },
      { value: "38+", label: "Healing camps organised" },
      { value: "1,900+", label: "Lives touched", note: "Through talks and healing camps" },
      { value: "72+", label: "Pranic Healing intro talks" },
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
      { value: "1,050+", label: "Healing sessions" },
      { value: "10", label: "Years of Pranic Healing" },
      { value: "38+", label: "Healing camps" },
    ],
    allStats: [
      { value: "1,050+", label: "Healing sessions" },
      { value: "16", label: "Years of experience", note: "15 teaching, 1 as incubation manager" },
      { value: "10", label: "Years of Pranic Healing" },
      { value: "38+", label: "Healing camps organised" },
      { value: "1,200+", label: "Lives touched", note: "Through our healing camps" },
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
      { year: "Pranic Healing", text: "Enrols in the Basic Pranic Healing course and begins a ten-year practice." },
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

// Client testimonials. The "What people say" section on the home page
// appears automatically once you add at least one. Only use real words
// from real clients, with their permission. Example:
// { quote: "I slept properly for the first time in months.", name: "Anita R.", detail: "Healing session client" },
export const testimonials = [];

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
    ],
  },
  {
    label: "Schedule",
    href: "/schedule",
    children: [
      { label: "Classes", href: "/schedule#classes" },
      { label: "Events", href: "/schedule#events" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Healing services", href: "/shop#healings" },
      { label: "Oils and salts", href: "/shop#products" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
