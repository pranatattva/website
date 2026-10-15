import Link from "next/link";
import PageHero from "@/components/PageHero";
import { aboutNav } from "@/components/aboutNav";

export const metadata = {
  title: "What is Pranic Healing?",
  description: "Pranic Healing is a no-touch, drug-free energy healing system. Learn how it works and what it can help with.",
};

export default function PranicHealingPage() {
  return (
    <>
      <PageHero
        title="What is Pranic Healing?"
        lede="A no-touch, drug-free way of working with prana, the life energy that keeps the body alive and well."
        crumbs={[{ label: "About", href: "/about" }, { label: "Pranic Healing" }]}
        subnav={aboutNav}
        active="/about/pranic-healing"
      />
      <section className="section">
        <div className="wrap narrow">
          <div className="prose">
            <p className="lede">
              The body has a natural ability to repair itself. Pranic Healing supports that process by improving the flow and quality of energy in the energy body, the field that surrounds and interpenetrates the physical body.
            </p>
            <h2>Two simple principles</h2>
            <p>
              <strong>Cleansing.</strong> Stress, illness and negative emotions leave behind used-up, congested energy. Removing it makes room for healing.
            </p>
            <p>
              <strong>Energising.</strong> Fresh prana is then projected to the areas that are depleted, speeding up the body's own recovery.
            </p>
            <h2>What people come to us for</h2>
            <ul>
              <li>Everyday aches, low energy and poor sleep</li>
              <li>Stress, anxiety, grief and emotional heaviness</li>
              <li>Support during recovery from illness, alongside medical treatment</li>
              <li>Relationship and workplace tension</li>
              <li>Children's focus and calm</li>
            </ul>
            <h2>The energy centres</h2>
            <p>
              Pranic Healing works with eleven major energy centres, or chakras. Each one is linked to particular organs and to particular emotions and qualities. Healers learn to assess these centres and balance them.
            </p>
          </div>

          <ul className="facts">
            <li><strong>No touch</strong><span>You stay clothed and relaxed throughout.</span></li>
            <li><strong>No medicines</strong><span>Nothing is ingested or applied.</span></li>
            <li><strong>Anywhere</strong><span>Distance healing works across cities and countries.</span></li>
          </ul>

          <div className="prose">
            <h2>Is it safe alongside medicine?</h2>
            <p>
              Yes. Pranic Healing is complementary and is meant to work together with medical care, never in place of it. Please keep taking any prescribed medication and stay in touch with your doctor.
            </p>
            <h2>Can I learn it?</h2>
            <p>
              Absolutely. The Basic Pranic Healing course is a two-day class with no prerequisites. By the end you'll be able to give simple healings to yourself and your family.
            </p>
          </div>
          <div className="btn-row" style={{ marginTop: 32 }}>
            <Link href="/shop#healings" className="btn">Book a session</Link>
            <Link href="/schedule#classes" className="btn btn--ghost">Find a class</Link>
          </div>
        </div>
      </section>
    </>
  );
}
