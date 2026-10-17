import Link from "next/link";
import PageHero from "@/components/PageHero";
import Decor from "@/components/Decor";
import { aboutNav } from "@/components/aboutNav";
import { Portrait } from "@/components/Art";
import StatBand from "@/components/StatBand";
import { mcks } from "@/lib/mcks";

export const metadata = {
  title: "Grand Master Choa Kok Sui",
  description: "Grand Master Choa Kok Sui, the beloved founder of Modern Pranic Healing and Arhatic Yoga, and our gratitude for his teachings.",
};

export default function MCKSPage() {
  return (
    <>
      <PageHero
        title="Grand Master Choa Kok Sui"
        lede={`${mcks.subtitle}.`}
        crumbs={[{ label: "About", href: "/about" }, { label: "Master Choa Kok Sui" }]}
        subnav={aboutNav}
        active="/about/master-choa-kok-sui"
      />
      <section className="section">
        <Decor preset="a" />
        <div className="wrap lineage">
          <aside className="lineage-side">
            <Portrait initials="MCKS" src={mcks.photo} alt="Grand Master Choa Kok Sui" />
          </aside>
          <div>
            <StatBand stats={mcks.stats} />
            <div className="tribute">
              {mcks.tribute.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="prose" style={{ marginTop: 40 }}>
              <h2 style={{ marginTop: 0 }}>His life and work</h2>
              {mcks.bio.map((p, i) => <p key={i}>{p}</p>)}
              <h2>Teachings that followed</h2>
              <ul>
                <li><strong>Pranic Healing courses</strong>, from the basic level through advanced healing, Pranic Psychotherapy and Pranic Crystal Healing.</li>
                <li><strong>The Meditation on Twin Hearts</strong>, a guided meditation for peace and loving-kindness, practised by groups worldwide.</li>
                <li><strong>Arhatic Yoga</strong>, a systematic path of spiritual practice built on character and service.</li>
              </ul>
            </div>
            <div className="btn-row" style={{ marginTop: 32 }}>
              <Link href="/courses" className="btn">Learn Pranic Healing</Link>
              <Link href="/schedule#events" className="btn btn--ghost">Join a full moon meditation</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
