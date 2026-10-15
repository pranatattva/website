import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import Decor, { Mandala } from "@/components/Decor";
import StatBand from "@/components/StatBand";
import ScheduleList from "@/components/ScheduleList";
import GalleryGrid from "@/components/GalleryGrid";
import { Portrait } from "@/components/Art";
import {
  GoldRule, Medal, Tick, HealGlyph, TransformGlyph, AlignGlyph,
  IcHands, IcBook, IcDrop, IcMind, IcSun, IcMoon, IcHeart, IcLeaf, IcHome, IcEye, IcBroom, IcSpark,
} from "@/components/Icons";
import { getGallery, getPosts, getUpcoming } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { centreStats, centreStatsNote, healers, site, testimonials } from "@/lib/site";

export const revalidate = 60;

const MOTES = [
  { l: "8%", s: 6, t: 18, d: 0, x: "30px" },
  { l: "18%", s: 4, t: 22, d: 4, x: "-20px" },
  { l: "27%", s: 7, t: 16, d: 8, x: "18px" },
  { l: "38%", s: 4, t: 24, d: 2, x: "-26px" },
  { l: "61%", s: 5, t: 20, d: 6, x: "22px" },
  { l: "72%", s: 7, t: 17, d: 10, x: "-16px" },
  { l: "83%", s: 4, t: 23, d: 3, x: "28px" },
  { l: "92%", s: 6, t: 19, d: 7, x: "-22px" },
];

const OFFERS = [
  {
    icon: <IcHands />,
    title: "Healings",
    text: "One-to-one sessions in person at Baner or by distance, for body, mind and circumstance.",
    points: ["Physical discomfort and low energy", "Stress, anxiety and emotional heaviness", "Relationship and workplace tension", "Free discovery call to begin"],
    href: "/shop#healings",
    cta: "Book a healing",
  },
  {
    icon: <IcBook />,
    title: "Classes and meditation",
    text: "Learn to heal yourself and your family, and sit with us in meditation.",
    points: ["Basic Pranic Healing course", "Advanced courses and Pranic Psychotherapy", "Full moon Twin Hearts meditation", "Free healing camps and intro talks"],
    href: "/schedule",
    cta: "See the schedule",
  },
  {
    icon: <IcDrop />,
    title: "Wellness products",
    text: "The oils and salts we use at the centre, for keeping your home and aura clear.",
    points: ["Essential oils and cleansing blends", "Sea salt and bath salts", "Salt water bath kits", "Delivered across India"],
    href: "/shop#products",
    cta: "Shop oils and salts",
  },
];

const CONCERNS = [
  { icon: <IcMind />, title: "Stress and anxiety", text: "A racing mind that won't slow down" },
  { icon: <IcSun />, title: "Low energy", text: "Feeling drained before the day is done" },
  { icon: <IcMoon />, title: "Restless sleep", text: "Tired nights and heavy mornings" },
  { icon: <IcHeart />, title: "Emotional heaviness", text: "Grief, anger or hurt that lingers" },
  { icon: <IcLeaf />, title: "Physical discomfort", text: "Gentle support alongside medical care" },
  { icon: <IcHome />, title: "Heavy spaces", text: "Homes and workplaces that feel stuck" },
];

export default async function HomePage() {
  const [upcoming, posts, photos] = await Promise.all([getUpcoming(4), getPosts({ limit: 3 }), getGallery({ limit: 6 })]);

  return (
    <>
      {/* 1. Hero: the living logo */}
      <section className="hero">
        <Decor preset="hero" />
        <div className="motes" aria-hidden="true">
          {MOTES.map((m, i) => (
            <span key={i} className="mote" style={{ left: m.l, "--s": `${m.s}px`, "--t": `${m.t}s`, "--d": `${m.d}s`, "--x": m.x }} />
          ))}
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-mark">
            <LogoMark animated size={400} title="Pranatattva logo" />
          </div>
          <h1 className="hero-name">Pranatattva</h1>
          <p className="hero-tagline">✨ Heal • Transform • Align ✨</p>
          <p className="hero-copy">
            Your body already knows how to heal itself. Pranic Healing gently supports it, with no touch and no medicines, at our centre in Baner, Pune or wherever you are.
          </p>
          <div className="btn-row">
            <Link href="/shop#healings" className="btn">Book a healing session</Link>
            <Link href="/schedule" className="btn btn--ghost">Join a class or meditation</Link>
          </div>
        </div>
      </section>

      {/* 2. Facts and figures */}
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <StatBand stats={centreStats} note={centreStatsNote} overlap />
      </div>

      {/* 3. What is Pranic Healing */}
      <section className="section">
        <Decor preset="a" />
        <div className="wrap split">
          <div>
            <GoldRule />
            <h2>An ancient science, made practical</h2>
            <p className="lede">
              Prana is the life energy that keeps the body alive. Pranic Healing works on the energy field around and within your body, cleansing what is heavy and replenishing what is depleted, so your body's own healing can do its work.
            </p>
            <p className="muted">
              Grand Master Choa Kok Sui organised this ancient wisdom into a clear, step-by-step system that anyone can experience, and anyone can learn.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link href="/about/pranic-healing" className="btn btn--ghost">How Pranic Healing works</Link>
            </div>
          </div>
          <div className="flow-steps" style={{ gridTemplateColumns: "1fr" }}>
            <div className="flow-step card"><Medal size="medal--sm"><IcEye /></Medal><h3>Scan</h3><p>Your healer feels your energy field to find where it is congested or depleted.</p></div>
            <div className="flow-step card"><Medal size="medal--sm"><IcBroom /></Medal><h3>Cleanse</h3><p>Used-up, heavy energy is gently swept away.</p></div>
            <div className="flow-step card"><Medal size="medal--sm"><IcSpark /></Medal><h3>Energise</h3><p>Fresh prana is projected where it's needed, then stabilised so the benefit lasts.</p></div>
          </div>
        </div>
      </section>

      {/* 4. What we offer */}
      <section className="section section--lavender">
        <Decor preset="b" />
        <div className="wrap">
          <div className="section-head center" style={{ justifyContent: "center", textAlign: "center" }}>
            <div>
              <GoldRule />
              <h2>Three ways to begin with us</h2>
              <p style={{ margin: "8px auto 0" }}>Whether you want healing, want to learn, or simply want a calmer home.</p>
            </div>
          </div>
          <div className="offer-grid">
            {OFFERS.map((o) => (
              <article key={o.title} className="offer card">
                <Medal>{o.icon}</Medal>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <ul className="ticks">{o.points.map((p) => <li key={p}><Tick />{p}</li>)}</ul>
                <Link href={o.href} className="text-link">{o.cta}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What it helps with */}
      <section className="section">
        <Decor preset="c" />
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>If any of this sounds familiar</h2>
              <p>People come to us carrying all kinds of weight. These are some of the most common.</p>
            </div>
            <Link href="/shop#healings" className="btn btn--sm">Book a free discovery call</Link>
          </div>
          <div className="concerns">
            {CONCERNS.map((c) => (
              <div key={c.title} className="concern card">
                <Medal size="medal--sm">{c.icon}</Medal>
                <div><h3>{c.title}</h3><p>{c.text}</p></div>
              </div>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: 20 }}>Pranic Healing complements medical care and never replaces it.</p>
        </div>
      </section>

      {/* 6. Upcoming */}
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
          <ScheduleList items={upcoming} showKind />
        </div>
      </section>

      {/* 7. Healers */}
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
                    {h.stats.map((s) => (
                      <li key={s.label} className="stat"><strong>{s.value}</strong><span>{s.label}</span></li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials, shown once real ones are added in lib/site.js */}
      {testimonials.length > 0 && (
        <section className="section section--lavender">
          <Decor preset="b" />
          <div className="wrap">
            <div className="section-head"><div><h2>What people say afterwards</h2></div></div>
            <div className="quotes">
              {testimonials.map((t, i) => (
                <figure key={i} className="quote-card card" style={{ margin: 0 }}>
                  <p>“{t.quote}”</p>
                  <footer><strong>{t.name}</strong>{t.detail ? `, ${t.detail}` : ""}</footer>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Free meditation invitation */}
      <section className="section" style={{ paddingTop: testimonials.length ? undefined : 0 }}>
        <div className="wrap">
          <div className="calm-band">
            <Mandala className="orn" />
            <h2>Sit with us under the full moon</h2>
            <p>
              Every full moon we gather for the Meditation on Twin Hearts, a guided meditation for peace and loving-kindness. It's free, open to everyone, and the simplest way to feel what this work does before committing to anything.
            </p>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <Link href="/schedule#events" className="btn btn--gold">See the next date</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Moments: latest gallery photos (appears once photos are added) */}
      {photos.length > 0 && (
        <section className="section">
          <Decor preset="a" />
          <div className="wrap">
            <div className="section-head">
              <div>
                <h2>Moments from the centre</h2>
                <p>Healing camps, classes and meditations.</p>
              </div>
              <Link href="/gallery" className="btn btn--ghost btn--sm">View the gallery</Link>
            </div>
            <GalleryGrid photos={photos} showFilters={false} />
          </div>
        </section>
      )}

      {/* 10. Journal */}
      {posts.length > 0 && (
        <section className="section section--lavender">
          <Decor preset="c" />
          <div className="wrap">
            <div className="section-head">
              <div>
                <h2>From the journal</h2>
                <p>Notes on healing, meditation and everyday energy hygiene.</p>
              </div>
              <Link href="/blog" className="btn btn--ghost btn--sm">Read the blog</Link>
            </div>
            <div className="posts">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="post-card">
                  <div className="post-cover">
                    {p.cover_url ? <img src={p.cover_url} alt="" /> : <><LogoMark size={200} title="" /><span className="cover-word">{p.category}</span></>}
                  </div>
                  <div className="post-body">
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <span className="post-date">{formatDate(p.published_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. Visit */}
      <section className="section">
        <div className="wrap">
          <div className="visit">
            <div className="visit-copy">
              <h2>Visit the centre</h2>
              <p>A quiet room on the fourth floor of Ambrosia Galaxy, a few minutes from Baner Road.</p>
              <address>
                {site.address.line1}
                <br />
                {site.address.line2}
              </address>
              <div className="btn-row">
                <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn--gold">Get directions</a>
                <Link href="/contact" className="btn btn--ghost">Contact us</Link>
              </div>
            </div>
            <iframe className="map-frame" src={site.mapEmbed} title="Map to Pranatattva centre" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}
