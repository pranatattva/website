import Link from "next/link";
import PageHero from "@/components/PageHero";
import { aboutNav } from "@/components/aboutNav";
import { Portrait } from "@/components/Art";

export const metadata = {
  title: "Grand Master Choa Kok Sui",
  description: "The life and teachings of Grand Master Choa Kok Sui, founder of Modern Pranic Healing and Arhatic Yoga.",
};

export default function MCKSPage() {
  return (
    <>
      <PageHero
        title="Grand Master Choa Kok Sui"
        lede="Founder of Modern Pranic Healing and Arhatic Yoga, and the teacher whose work we practise every day."
        crumbs={[{ label: "About", href: "/about" }, { label: "Master Choa Kok Sui" }]}
        subnav={aboutNav}
        active="/about/master-choa-kok-sui"
      />
      <section className="section">
        <div className="wrap profile">
          <aside className="profile-side">
            {/* Replace with an authorised photograph when available */}
            <Portrait initials="MCKS" />
            <ul className="stats stats--large" style={{ gridTemplateColumns: "1fr" }}>
              <li className="stat"><strong>1952 – 2007</strong><span>Born in the Philippines</span></li>
            </ul>
          </aside>
          <div className="prose">
            <p className="lede">
              Grand Master Choa Kok Sui was a Filipino teacher of Chinese descent, a chemical engineer by training and a lifelong student of the healing and spiritual traditions of the world.
            </p>
            <h2>A practical, testable system</h2>
            <p>
              After years of study and experimentation, he organised ancient energy-healing ideas into a clear, step-by-step method that anyone could learn. He called it Pranic Healing. His emphasis was always practical: simple protocols, repeatable results, and healing that works alongside conventional medicine rather than against it.
            </p>
            <p>
              His first book on the subject, later published as <em>Miracles Through Pranic Healing</em>, introduced the system to readers around the world. He went on to write many more books on healing, meditation and spiritual practice.
            </p>
            <h2>Teachings that followed</h2>
            <ul>
              <li><strong>Pranic Healing courses</strong>, from the basic level through advanced healing, psychotherapy and crystal healing.</li>
              <li><strong>The Meditation on Twin Hearts</strong>, a guided meditation for peace and loving-kindness, practised by groups worldwide.</li>
              <li><strong>Arhatic Yoga</strong>, a system of spiritual practice for character building and inner development.</li>
              <li><strong>Practical teachings</strong> on prosperity, relationships and service, rooted in the same principles.</li>
            </ul>
            <h2>His legacy today</h2>
            <p>
              Since his passing in 2007, his work has been carried forward by foundations and certified instructors in many countries. Every course we teach at Pranatattva follows the curriculum he created.
            </p>
            <div className="note" style={{ marginTop: 32 }}>
              <p>
                To experience his teachings first-hand, join our next{" "}
                <Link href="/schedule/classes">Basic Pranic Healing class</Link> or a free{" "}
                <Link href="/schedule/events">full moon meditation</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
