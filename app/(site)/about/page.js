import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Portrait } from "@/components/Art";
import LogoMark from "@/components/LogoMark";
import { aboutNav } from "@/components/aboutNav";
import { healers } from "@/lib/site";

export const metadata = { title: "About us", description: "Pranatattva is a Pranic Healing centre in Baner, Pune, led by Pragati and Santosh Pullewar." };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Pranatattva"
        lede="Prana means life energy. Tattva means essence or truth. Pranatattva is a centre devoted to the essence of life energy, and to sharing it simply and kindly."
        crumbs={[{ label: "About" }]}
        subnav={aboutNav}
        active="/about"
      />
      <section className="section">
        <div className="wrap split split--top">
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>Why we exist</h2>
            <p>
              Many people carry stress, pain or emotional weight that never quite lifts. We started Pranatattva so that anyone in Pune could experience Pranic Healing in a calm, welcoming space, and learn to use it themselves.
            </p>
            <p>
              We follow the system of Modern Pranic Healing developed by Grand Master Choa Kok Sui. Alongside one-to-one healing, we run certified courses, monthly full moon meditations and free healing camps for the community.
            </p>
            <p>
              <Link href="/about/pranic-healing" className="text-link">How Pranic Healing works</Link>
            </p>
          </div>
          <div className="aura-panel">
            <LogoMark size={260} />
            <h3 style={{ position: "relative" }}>The meaning in our mark</h3>
            <p className="muted" style={{ position: "relative", margin: 0 }}>
              The golden ring is the sun, the source of prana. The four petals open outward like a lotus around a still centre, a reminder to heal, transform and align from the inside out.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--lavender">
        <div className="wrap">
          <div className="section-head"><div><h2>Our lineage and our teachers</h2></div></div>
          <div className="healers">
            <Link href="/about/master-choa-kok-sui" className="healer-card">
              <Portrait initials="MCKS" />
              <div>
                <h3>Grand Master Choa Kok Sui</h3>
                <p className="role">Founder of Modern Pranic Healing and Arhatic Yoga</p>
                <p className="muted small" style={{ margin: 0 }}>The teacher whose system we practise and pass on.</p>
              </div>
            </Link>
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
    </>
  );
}
