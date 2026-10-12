// Central place for business details. Edit here and the whole site updates.
export const site = {
  name: "Pranatattva",
  fullName: "Pranatattva Pranic Healing Centre",
  tagline: "Heal • Transform • Align",
  description:
    "Pranatattva is a Pranic Healing centre in Baner, Pune offering healing sessions, Pranic Healing classes, meditations and free healing camps.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pranatattva.com",
  email: "info@pranatattva.com",
  // TODO: replace the phone and WhatsApp placeholders with the real number
  phoneDisplay: "+91 XXXXX XXXXX",
  phoneHref: "tel:+910000000000",
  whatsappHref: "https://wa.me/910000000000",
  // TODO: replace with the real Instagram profile
  instagramHref: "https://www.instagram.com/",
  instagramHandle: "@pranatattva",
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

export const healers = [
  {
    slug: "pragati-pullewar",
    name: "Pragati Pullewar",
    role: "Pranic Healer and Instructor",
    initials: "PP",
    // TODO: replace with real figures
    stats: [
      { value: "1,000+", label: "healings given" },
      { value: "10+", label: "years of practice" },
      { value: "500+", label: "healing camps" },
    ],
    // TODO: replace with the real bio
    intro:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    bio: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus. Maecenas faucibus mollis interdum, sed posuere consectetur est at lobortis.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur blandit tempus porttitor.",
    ],
    focus: ["Lorem ipsum dolor", "Sit amet consectetur", "Adipiscing elit sed"],
  },
  {
    slug: "santosh-pullewar",
    name: "Santosh Pullewar",
    role: "Pranic Healer and Instructor",
    initials: "SP",
    // TODO: replace with real figures
    stats: [
      { value: "1,000+", label: "healings given" },
      { value: "10+", label: "years of practice" },
      { value: "500+", label: "healing camps" },
    ],
    // TODO: replace with the real bio
    intro:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.",
    bio: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Aenean lacinia bibendum nulla sed consectetur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Etiam porta sem malesuada magna mollis euismod.",
    ],
    focus: ["Lorem ipsum dolor", "Sit amet consectetur", "Adipiscing elit sed"],
  },
];

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
      { label: "Classes", href: "/schedule/classes" },
      { label: "Events", href: "/schedule/events" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Healing services", href: "/shop/services" },
      { label: "Products", href: "/shop/products" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
