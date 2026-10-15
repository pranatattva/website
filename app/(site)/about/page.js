import Link from "next/link";
import PageHero from "@/components/PageHero";
import Decor from "@/components/Decor";
import StatBand from "@/components/StatBand";
import HealerFeature from "@/components/HealerFeature";
import { Portrait } from "@/components/Art";
import { aboutNav } from "@/components/aboutNav";
import { GoldRule, Medal, IcEye, IcBroom, IcSpark, IcLeaf, IcSun, IcBook, IcHeart, IcStar, IcHome } from "@/components/Icons";
import { centreStats, centreStatsNote, healers } from "@/lib/site";
import { mcks } from "@/lib/mcks";

export const metadata = {
  title: "About us",
  description: "The science of Pranic Healing, the lineage of Grand Master Choa Kok Sui, and Pragati and Santosh Pullewar, the people behind Pranatattva in Baner, Pune.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="The science, the lineage, and the people"
        lede="Pranic Healing as Grand Master Choa Kok Sui taught it, practised and shared with care at our centre in Baner, Pune."
        crumbs={[{ label: "About" }]}
        subnav={aboutNav}
        active="/about"
      />

      {/* Facts and figures */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <StatBand stats={centreStats} note={centreStatsNote} />
        </div>
      </section>

      {/* Foundations: two principles */}
      <section className="section">
        <Decor preset="a" />
        <div className="wrap">
          <div className="split split--top">
            <div>
              <GoldRule />
              <h2>What is Pranic Healing?</h2>
              <p className="lede">
                A no-touch, drug-free energy healing system that rests on two simple principles about how the body heals.
              </p>
              <p className="muted">
                Every physical and emotional imbalance has an energetic counterpart. Pranic Healing works on that energy body, the aura and its chakras, so the physical body can follow.
              </p>
              <Link href="/about/pranic-healing" className="text-link">Read more about Pranic Healing</Link>
            </div>
            <div className="pillars">
              <div className="pillar card">
                <Medal size="medal--sm"><IcLeaf /></Medal>
                <h3>The body heals itself</h3>
                <p>A cut closes, a fever passes, a bone knits back together. The body already has the ability to repair itself.</p>
              </div>
              <div className="pillar card">
                <Medal size="medal--sm"><IcSun /></Medal>
                <h3>Prana speeds it up</h3>
                <p>Healing can be accelerated by increasing the life energy, or prana, available to the part of the body that needs it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section--lavender">
        <Decor preset="b" />
        <div className="wrap">
          <div className="section-head"><div><h2>How a healing works</h2><p>The healer works a few inches from the body. You stay clothed and relaxed throughout.</p></div></div>
          <div className="flow-steps">
            <div className="flow-step card"><Medal size="medal--sm"><IcEye /></Medal><h3>Scan</h3><p>Feel the energy body for areas of congestion or depletion.</p></div>
            <div className="flow-step card"><Medal size="medal--sm"><IcBroom /></Medal><h3>Cleanse</h3><p>Remove used-up, diseased energy from the affected areas.</p></div>
            <div className="flow-step card"><Medal size="medal--sm"><IcSpark /></Medal><h3>Energise</h3><p>Project fresh prana to restore balance and vitality, then stabilise it.</p></div>
          </div>
        </div>
      </section>

      {/* The lineage */}
      <section className="section" id="lineage">
        <Decor preset="d" />
        <div className="wrap lineage">
          <aside className="lineage-side">
            <Portrait initials="MCKS" src={mcks.photo} alt="Grand Master Choa Kok Sui" />
            <div className="mini-stats">
              {mcks.stats.map((s) => <div key={s.label} className="card"><strong>{s.value}</strong><span>{s.label}</span></div>)}
            </div>
          </aside>
          <div>
            <p className="hf-role">The lineage</p>
            <h2>Grand Master Choa Kok Sui</h2>
            <p className="hf-short">{mcks.subtitle}</p>
            <div className="prose">{mcks.bio.map((p, i) => <p key={i}>{p}</p>)}</div>
            <div className="tribute">{mcks.tribute.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}<p>{mcks.tribute[mcks.tribute.length - 1]}</p></div>
            <div style={{ marginTop: 24 }}><Link href="/about/master-choa-kok-sui" className="btn btn--ghost btn--sm">Read more about our Grand Master</Link></div>
          </div>
        </div>
      </section>

      {/* How we practise */}
      <section className="section section--deep">
        <Decor preset="c" />
        <div className="wrap">
          <div className="section-head"><div><h2>How we practise</h2><p>The values that shape every session and class at Pranatattva.</p></div></div>
          <div className="pillars pillars--4">
            <div className="pillar card"><Medal size="medal--sm"><IcBook /></Medal><h3>As it was taught</h3><p>We follow Grand Master Choa Kok Sui's protocols and curriculum faithfully.</p></div>
            <div className="pillar card"><Medal size="medal--sm"><IcHeart /></Medal><h3>Service first</h3><p>Free healing camps and talks are at the heart of what we do.</p></div>
            <div className="pillar card"><Medal size="medal--sm"><IcStar /></Medal><h3>Alongside medicine</h3><p>Healing complements medical care. We always encourage you to keep seeing your doctor.</p></div>
            <div className="pillar card"><Medal size="medal--sm"><IcHome /></Medal><h3>Warm and simple</h3><p>A down-to-earth space where you're listened to and never rushed.</p></div>
          </div>
        </div>
      </section>

      {/* The people */}
      <section className="section" id="people">
        <Decor preset="a" />
        <div className="wrap">
          <div className="section-head"><div><GoldRule /><h2>The people behind Pranatattva</h2><p>Two healers, one practice.</p></div></div>
          {healers.map((h, i) => (
            <HealerFeature key={h.slug} healer={h} flip={i % 2 === 1} headingLevel={3} />
          ))}
        </div>
      </section>

      {/* Begin */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="calm-band center">
            <h2>Come and see for yourself</h2>
            <p style={{ margin: "0 auto" }}>A first conversation costs nothing. Tell us what you're carrying and we'll tell you honestly whether this work can help.</p>
            <div className="btn-row" style={{ marginTop: 26, justifyContent: "center" }}>
              <Link href="/shop#healings" className="btn btn--gold">Book a free discovery call</Link>
              <Link href="/contact" className="btn btn--ghost" style={{ color: "#fff", background: "rgba(255,255,255,.08)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.4)" }}>Ask a question</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
