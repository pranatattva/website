import Link from "next/link";
import PageHero from "@/components/PageHero";
import { aboutNav } from "@/components/aboutNav";
import { Portrait } from "@/components/Art";

export default function HealerProfile({ healer }) {
  return (
    <>
      <PageHero
        title={healer.name}
        lede={healer.role}
        crumbs={[{ label: "About", href: "/about" }, { label: healer.name }]}
        subnav={aboutNav}
        active={`/about/${healer.slug}`}
      />
      <section className="section">
        <div className="wrap profile">
          <aside className="profile-side">
            <Portrait initials={healer.initials} src={healer.photo} alt={healer.name} />
            <ul className="stats stats--large">
              {healer.stats.map((s) => (
                <li key={s.label} className="stat"><strong>{s.value}</strong><span>{s.label}</span></li>
              ))}
            </ul>
          </aside>
          <div className="prose">
            <p className="lede">{healer.intro}</p>
            {healer.bio.map((p, i) => <p key={i}>{p}</p>)}
            <h2>Areas of focus</h2>
            <ul>{healer.focus.map((f) => <li key={f}>{f}</li>)}</ul>
            <div className="btn-row" style={{ marginTop: 32 }}>
              <Link href="/shop/services" className="btn">Book a session</Link>
              <Link href="/schedule/classes" className="btn btn--ghost">Classes they teach</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
