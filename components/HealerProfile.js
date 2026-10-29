import Link from "next/link";
import PageHero from "@/components/PageHero";
import Decor from "@/components/Decor";
import HealerFeature from "@/components/HealerFeature";
import { aboutNav } from "@/components/aboutNav";

export default function HealerProfile({ healer }) {
  return (
    <>
      <PageHero
        title={healer.name}
        lede={`${healer.role}. ${healer.shortProfile}.`}
        crumbs={[{ label: "About", href: "/about" }, { label: healer.name }]}
        subnav={aboutNav}
        active={`/about/${healer.slug}`}
      />
      <section className="section">
        <Decor preset="a" />
        <div className="wrap">
          <HealerFeature healer={healer} full hideName headingLevel={2} />
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="calm-band center">
            <h2>Begin your healing journey</h2>
            <p style={{ margin: "0 auto" }}>Start with a free discovery call, or book a healing session with {healer.firstName}.</p>
            <div className="btn-row" style={{ marginTop: 26, justifyContent: "center" }}>
              <Link href="/shop#healings" className="btn btn--gold">Book a session</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
