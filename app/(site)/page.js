import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import Decor from "@/components/Decor";
import StatBand from "@/components/StatBand";
import Carousel from "@/components/Carousel";
import EventCard from "@/components/EventCard";
import GalleryGrid from "@/components/GalleryGrid";
import TestimonialSlider from "@/components/TestimonialSlider";
import { Portrait } from "@/components/Art";
import { GoldRule, Medal, Tick, HealIcon, IcHands, IcBook, IcDrop, IcEye, IcBroom, IcSpark, WhatsApp } from "@/components/Icons";
import { getGallery, getPosts, getProducts, getTestimonials, getUpcoming } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { centreStats, healers, hero, masterQuote, site, testimonialPlaceholders, waLink } from "@/lib/site";

export const revalidate = 60;

const MOTES = [
  { l: "8%", s: 6, t: 18, d: 0, x: "30px" },
  { l: "22%", s: 4, t: 22, d: 4, x: "-20px" },
  { l: "38%", s: 4, t: 24, d: 2, x: "-26px" },
  { l: "61%", s: 5, t: 20, d: 6, x: "22px" },
  { l: "78%", s: 7, t: 17, d: 10, x: "-16px" },
  { l: "92%", s: 6, t: 19, d: 7, x: "-22px" },
];

const CONCERNS = [
  { icon: "leaf", type: "Physical Healing", title: "Aches, illness or slow recovery", text: "Support for the body alongside medical care" },
  { icon: "mind", type: "Psychological Healing", title: "Stress, anxiety or grief", text: "A racing mind, heavy heart or old fears" },
  { icon: "link", type: "Relationship Healing", title: "Strained relationships", text: "Tension with a partner, family or colleagues" },
  { icon: "briefcase", type: "Job and Career Healing", title: "Stuck at work", text: "Low confidence, conflict or no clear direction" },
  { icon: "chart", type: "Business Healing", title: "A business that feels blocked", text: "Slow growth, team friction or money worries" },
  { icon: "home", type: "Home Cleansing", title: "A home that feels heavy", text: "Spaces that feel stuck, tense or draining" },
];

export default async function HomePage() {
  const [upcoming, posts, photos, testimonials, products] = await Promise.all([
    getUpcoming(10), getPosts({ limit: 3 }), getGallery({ limit: 6 }), getTestimonials(), getProducts(),
  ]);

  const offers = [
    {
      icon: <IcHands />, title: "Healings",
      text: "One-to-one sessions in person at Baner or by distance, for body, mind and circumstance.",
      points: ["Physical and psychological healing", "Relationship, career and business healing", "Home cleansing, Pranic Facial and more", "Free discovery call to begin"],
      href: "/shop#healings", cta: "Explore healings",
    },
    {
      icon: <IcBook />, title: "Courses and meditation",
      text: "Learn to heal yourself and your family, and sit with us in meditation.",
      points: ["Basic and Advanced Pranic Healing", "Pranic Psychotherapy and Arhatic Yoga", "Full moon Twin Hearts meditation", "Free healing camps and intro talks"],
      href: "/courses", cta: "See the courses",
    },
    products.length > 0 && {
      icon: <IcDrop />, title: "Wellness products",
      text: "The oils and salts we use at the centre, for keeping your home and aura clear.",
      points: ["Essential oils and cleansing blends", "Sea salt and bath salts", "Salt water bath kits", "Delivered across India"],
      href: "/shop#products", cta: "Shop oils and salts",
    },
  ].filter(Boolean);

  return (
    <>
      {/* Hero: headline left, living logo right (stacked on mobile) */}
      <section className="hero">
        <Decor preset="hero" />
        <div className="motes" aria-hidden="true">
          {MOTES.map((m, i) => (
            <span key={i} className="mote" style={{ left: m.l, "--s": `${m.s}px`, "--t": `${m.t}s`, "--d": `${m.d}s`, "--x": m.x }} />
          ))}
        </div>
        <div className="wrap hero-grid">
          <div className="hero-mark">
            <LogoMark animated size={460} title="Pranatattva logo" />
          </div>
          <div className="hero-text">
            <p className="hero-tagline">{hero.eyebrow}</p>
            <h1 className="hero-headline">{hero.headline}</h1>
            <p className="hero-copy">{hero.copy}</p>
            <div className="btn-row">
              <Link href="/shop#healings" className="btn">Book a healing session</Link>
              <Link href="/courses" className="btn btn--ghost">Explore courses</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Facts and figures */}
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <StatBand stats={centreStats} overlap />
      </div>

      {/* Grand Master's words */}
      <section className="section quote-section">
        <div className="wrap center">
          <GoldRule />
          <blockquote className="master-quote">
            <p>“{masterQuote.text}”</p>
            <cite>{masterQuote.author}</cite>
          </blockquote>
        </div>
      </section>

      {/* What is Pranic Healing */}
      <section className="section" style={{ paddingTop: 0 }}>
        <Decor preset="a" />
        <div className="wrap split">
          <div>
            <GoldRule />
            <h2>An ancient science, made practical</h2>
            <p className="lede">
              Prana is the life energy that keeps the body alive. Pranic Healing works on the energy field around and within your body, cleansing what is heavy and replenishing what is depleted, so your body's own healing can do its work.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link href="/about/pranic-healing" className="btn btn--ghost">How Pranic Healing works</Link>
            </div>
          </div>
          <div className="hstep-list">
            <div className="hstep card"><Medal size="medal--sm"><IcEye /></Medal><div><h3>Scan</h3><p>Your healer feels your energy field to find where it is congested or depleted.</p></div></div>
            <div className="hstep card"><Medal size="medal--sm"><IcBroom /></Medal><div><h3>Cleanse</h3><p>Used-up, heavy energy is gently swept away.</p></div></div>
            <div className="hstep card"><Medal size="medal--sm"><IcSpark /></Medal><div><h3>Energise</h3><p>Fresh prana is projected where it's needed, then stabilised so the benefit lasts.</p></div></div>
          </div>
        </div>
      </section>

      {/* Ways to begin */}
      <section className="section section--lavender">
        <Decor preset="b" />
        <div className="wrap">
          <div className="section-head" style={{ justifyContent: "center", textAlign: "center" }}>
            <div>
              <GoldRule />
              <h2>Ways to begin with us</h2>
              <p style={{ margin: "8px auto 0" }}>Whether you want healing, want to learn, or simply want a calmer home.</p>
            </div>
          </div>
          <div className="offer-grid">
            {offers.map((o) => (
              <article key={o.title} className="offer card">
                <div className="offer-head"><Medal>{o.icon}</Medal><h3>{o.title}</h3></div>
                <p>{o.text}</p>
                <ul className="ticks">{o.points.map((p) => <li key={p}><Tick />{p}</li>)}</ul>
                <Link href={o.href} className="text-link">{o.cta}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What it helps with */}
      <section className="section">
        <Decor preset="c" />
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>If any of this sounds familiar</h2>
              <p>There's a type of healing for each of these. Tap one to ask us about it.</p>
            </div>
            <Link href="/shop#healing-types" className="btn btn--ghost btn--sm">All healing types</Link>
          </div>
          <div className="concerns">
            {CONCERNS.map((c) => (
              <a key={c.title} className="concern card" href={waLink(`Hi Pranatattva, I'd like to know more about ${c.type}.`)} target="_blank" rel="noopener noreferrer">
                <Medal size="medal--sm"><HealIcon name={c.icon} /></Medal>
                <div><span className="concern-type">{c.type}</span><h3>{c.title}</h3><p>{c.text}</p></div>
              </a>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: 20 }}>Pranic Healing complements medical care and never replaces it.</p>
        </div>
      </section>

      {/* Come and join us: swipeable cards */}
      <section className="section section--deep">
        <Decor preset="d" />
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Come and join us</h2>
              <p>Courses, free healing camps and full moon meditations at the centre.</p>
            </div>
            <Link href="/schedule" className="btn btn--ghost btn--sm">Full schedule</Link>
          </div>
          {upcoming.length ? (
            <Carousel label="Upcoming courses and events">
              {upcoming.map((it) => <EventCard key={`${it.kind}-${it.id}`} it={it} />)}
            </Carousel>
          ) : (
            <div className="empty">
              <h3>New dates are on the way</h3>
              <a href={waLink("Hi Pranatattva, when are your next courses and events?")} className="btn btn--sm btn--wa" target="_blank" rel="noopener noreferrer"><WhatsApp width={16} height={16} />Ask about upcoming dates</a>
            </div>
          )}
        </div>
      </section>

      {/* Healers */}
      <section className="section">
        <Decor preset="a" />
        <div className="wrap">
          <div className="section-head">
            <div>
              <GoldRule />
              <h2>The people behind Pranatattva</h2>
              <p>Two Associate Certified Pranic Healers, one warm, down-to-earth space.</p>
            </div>
            <Link href="/about" className="btn btn--ghost btn--sm">Our story</Link>
          </div>
          <div className="healers">
            {healers.map((h) => (
              <Link key={h.slug} href={`/about/${h.slug}`} className="healer-card">
                <Portrait initials={h.initials} src={h.photo} alt={h.name} />
                <div>
                  <p className="hf-role" style={{ margin: 0 }}>{h.role}</p>
                  <h3>{h.name}</h3>
                  <p className="role">{h.shortProfile}</p>
                  <ul className="stats">
                    {h.stats.map((s) => <li key={s.label} className="stat"><strong>{s.value}</strong><span>{s.label}</span></li>)}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--lavender">
        <Decor preset="b" />
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>What people say afterwards</h2>
              <p>Messages from people we've healed. Tap one to read it in full.</p>
            </div>
          </div>
          <TestimonialSlider items={testimonials} placeholders={testimonialPlaceholders} />
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <Decor preset="a" />
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Moments from the centre</h2>
              <p>Healing camps, courses and meditations.</p>
            </div>
            <Link href="/gallery" className="btn btn--ghost btn--sm">View the gallery</Link>
          </div>
          {photos.length ? (
            <GalleryGrid photos={photos} showFilters={false} />
          ) : (
            <div className="empty">
              <h3>Photos are coming soon</h3>
              <p>Meanwhile, see our latest moments on Instagram.</p>
              <a href={site.instagramHref} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">Visit {site.instagramHandle}</a>
            </div>
          )}
        </div>
      </section>

      {/* Full moon invitation */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="calm-band">
            <h2>Sit with us under the full moon</h2>
            <p>Every full moon we gather for the Meditation on Twin Hearts, a guided meditation for peace and loving-kindness. It's free, open to everyone, and the simplest way to feel what this work does.</p>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <Link href="/schedule#events" className="btn btn--gold">See the next date</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="section">
        <div className="wrap">
          <div className="visit">
            <div className="visit-copy">
              <h2>Visit the centre</h2>
              <p>A quiet room on the fourth floor of Ambrosia Galaxy, a few minutes from Baner Road.</p>
              <address>{site.address.line1}<br />{site.address.line2}</address>
              <div className="btn-row">
                <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn--gold">Get directions</a>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">WhatsApp us</a>
              </div>
            </div>
            <iframe className="map-frame" src={site.mapEmbed} title="Map to Pranatattva centre" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}
