import Link from "next/link";
import { Portrait } from "@/components/Art";
import { Tick } from "@/components/Icons";
import StatBand from "@/components/StatBand";

// Figures left out of each healer's stats section (matched by label)
const HIDE_STATS = {
  "pragati-pullewar": ["Healing Camps"],
  "santosh-pullewar": ["Years of Healing"],
};

// A healer's story. full = whole bio (profile page); otherwise the first two paragraphs.
export default function HealerFeature({ healer, flip = false, full = false, headingLevel = 2, hideName = false }) {
  const H = `h${headingLevel}`;
  const Sub = `h${Math.min(headingLevel + 1, 6)}`;
  const paragraphs = full ? healer.bio : healer.bio.slice(0, 2);
  const hidden = (HIDE_STATS[healer.slug] || []).map((l) => l.toLowerCase());
  const stats = healer.allStats.filter((s) => !hidden.includes(s.label.toLowerCase()));

  return (
    <article className={`healer-feature ${flip ? "healer-feature--flip" : ""}`} id={healer.slug}>
      <aside className="hf-side">
        <Portrait initials={healer.initials} src={healer.photo} alt={healer.name} />
        <Link href="/shop#healings" className="btn btn--sm">Book a session</Link>
      </aside>
      <div className="hf-main">
        {!hideName && (
          <>
            <p className="hf-role">{healer.role}</p>
            <H className="hf-name">{healer.name}</H>
            <p className="hf-short">{healer.shortProfile}</p>
          </>
        )}
        <div className="stat-band-compact">
          <StatBand stats={stats} label={`${healer.name} in numbers`} />
        </div>
        <div className="prose" style={{ marginTop: 32 }}>
          {paragraphs.map((p, i) => <p key={i} className={i === 0 ? "lede" : undefined}>{p}</p>)}
        </div>
        <blockquote className="big-quote" style={{ margin: "28px 0 36px" }}>
          {healer.quote}
          <cite>{healer.name}</cite>
        </blockquote>
        <div className="split split--top" style={{ gap: 32 }}>
          <div>
            <Sub style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1.1rem" }}>Credentials</Sub>
            <ul className="cred-list">{healer.credentials.map((c) => <li key={c}><Tick />{c}</li>)}</ul>
          </div>
          <div>
            <Sub style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1.1rem" }}>Journey</Sub>
            <ol className="timeline">
              {healer.timeline.map((t) => <li key={t.year}><strong>{t.year}</strong><span>{t.text}</span></li>)}
            </ol>
          </div>
        </div>
        {!full && <Link href={`/about/${healer.slug}`} className="btn btn--ghost btn--sm">Read {healer.firstName}'s full story</Link>}
      </div>
    </article>
  );
}
