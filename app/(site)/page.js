import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import ScheduleList from "@/components/ScheduleList";
import { Portrait } from "@/components/Art";
import { GoldRule, HealGlyph, TransformGlyph, AlignGlyph } from "@/components/Icons";
import { getPosts, getServices, getUpcoming } from "@/lib/data";
import { formatDate, formatINR } from "@/lib/format";
import { healers, site } from "@/lib/site";

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

export default async function HomePage() {
  const [upcoming, services, posts] = await Promise.all([getUpcoming(4), getServices(), getPosts({ limit: 3 })]);
  const featured = services.filter((s) => s.category !== "demo").slice(0, 3);
  const demo = services.find((s) => s.category === "demo");

  return (
    <>
      {/* Hero: the living logo */}
      <section className="hero">
        <div className="motes" aria-hidden="true">
          {MOTES.map((m, i) => (
            <span key={i} className="mote" style={{ left: m.l, "--s": `${m.s}px`, "--t": `${m.t}s`, "--d": `${m.d}s`, "--x": m.x }} />
          ))}
        </div>
        <div className="wrap">
          <div className="hero-mark">
            <LogoMark animated size={400} title="Pranatattva logo" />
          </div>
          <h1 className="hero-name">Pranatattva</h1>
          <p className="hero-tagline">✨ Heal • Transform • Align ✨</p>
          <p className="hero-copy">
            Gentle, no-touch Pranic Healing in Baner, Pune. Come for a session, learn to heal yourself and your family, or simply sit with us in meditation.
          </p>
          <div className="btn-row">
            <Link href="/shop/services" className="btn">Book a healing session</Link>
            <Link href="/schedule/classes" className="btn btn--ghost">See upcoming classes</Link>
          </div>
        </div>
      </section>

      {/* Three intentions */}
      <section className="section">
        <div className="wrap">
          <div className="intentions">
            <div className="intention">
              <HealGlyph />
              <h3>Heal</h3>
              <p>Release physical discomfort, stress and emotional heaviness by cleansing and energising the body's own energy field.</p>
            </div>
            <div className="intention">
              <TransformGlyph />
              <h3>Transform</h3>
              <p>Learn simple, practical techniques you can use every day, at home and at work, for yourself and the people you love.</p>
            </div>
            <div className="intention">
              <AlignGlyph />
              <h3>Align</h3>
              <p>Come back into balance through meditation, energy hygiene and a calmer, clearer relationship with your inner self.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What happens in a session */}
      <section className="section section--lavender">
        <div className="wrap split">
          <div>
            <GoldRule />
            <h2>What happens in a session</h2>
            <p className="lede">
              You stay fully clothed and relaxed. Your healer works on the energy field around your body, without touch, without medicines.
            </p>
            <ol className="steps" style={{ marginTop: 28 }}>
              <li><div><h3>Scanning</h3><p>Your healer feels your energy field to find where it is congested or depleted.</p></div></li>
              <li><div><h3>Cleansing</h3><p>Used-up, heavy energy is gently swept away.</p></div></li>
              <li><div><h3>Energising</h3><p>Fresh prana is projected where it's needed, then stabilised so it lasts.</p></div></li>
            </ol>
            <p style={{ marginTop: 28 }}>
              <Link href="/about/pranic-healing" className="text-link">Learn more about Pranic Healing</Link>
            </p>
          </div>
          <div className="aura-panel">
            <LogoMark size={260} />
            <blockquote>
              Prana is life energy. When it flows freely, the body remembers how to heal itself.
              <cite>The idea at the heart of Pranic Healing</cite>
            </blockquote>
            {demo && (
              <div style={{ marginTop: 28, position: "relative" }}>
                <p className="muted" style={{ marginBottom: 12 }}>Not sure where to start? Talk to us first and we'll suggest the right path.</p>
                <Link href="/shop/services" className="btn btn--gold btn--sm">Book a {demo.name.toLowerCase()}</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Healing services</h2>
              <p>One-to-one sessions in person at Baner, or by distance wherever you are.</p>
            </div>
            <Link href="/shop/services" className="btn btn--ghost btn--sm">All services and packages</Link>
          </div>
          <div className="svc-list">
            {featured.map((s) => (
              <div key={s.id} className={`svc ${s.category === "package" ? "svc--package" : ""}`}>
                <h3>{s.name}</h3>
                <div className="dur">{s.duration}</div>
                <p>{s.description}</p>
                <div className="svc-foot">
                  <span className="price">{formatINR(s.price)}</span>
                  <Link href="/shop/services" className="btn btn--sm">Book</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="section section--deep">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Coming up at the centre</h2>
              <p>Courses, free healing camps and full moon meditations.</p>
            </div>
            <Link href="/schedule" className="btn btn--ghost btn--sm">Full schedule</Link>
          </div>
          <ScheduleList items={upcoming} showKind />
        </div>
      </section>

      {/* Healers */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Your healers</h2>
              <p>Pranatattva is led by Pragati and Santosh Pullewar, certified Pranic Healers and instructors.</p>
            </div>
          </div>
          <div className="healers">
            {healers.map((h) => (
              <Link key={h.slug} href={`/about/${h.slug}`} className="healer-card">
                <Portrait initials={h.initials} />
                <div>
                  <h3>{h.name}</h3>
                  <p className="role">{h.role}</p>
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

      {/* Blog */}
      {posts.length > 0 && (
        <section className="section section--lavender">
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

      {/* Visit */}
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
