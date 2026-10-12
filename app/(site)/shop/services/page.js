import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import { shopNav } from "@/components/shopNav";
import { Tick } from "@/components/Icons";
import { getServices } from "@/lib/data";
import { formatINR } from "@/lib/format";

export const revalidate = 60;
export const metadata = { title: "Healing services", description: "Book a free discovery call, a Pranic Healing session or a healing package at Pranatattva, Baner, Pune." };

const GROUPS = [
  { key: "demo", title: "Start here", text: "A short, free conversation to understand what you need before you commit to anything." },
  { key: "session", title: "Single sessions", text: "Come to the centre in Baner or receive healing by distance, wherever you are." },
  { key: "package", title: "Packages", text: "For lasting change, regular sessions work best. Packages save you money and keep you on track." },
];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        title="Healing services"
        lede="Choose a service, pick a preferred date and time, and pay securely online. We'll confirm the exact slot by phone or WhatsApp."
        crumbs={[{ label: "Shop", href: "/shop" }, { label: "Healing services" }]}
        subnav={shopNav}
        active="/shop/services"
      />
      <section className="section">
        <div className="wrap">
          {GROUPS.map((g) => {
            const list = services.filter((s) => s.category === g.key);
            if (!list.length) return null;
            return (
              <div key={g.key} className="svc-group">
                <h2>{g.title}</h2>
                <p>{g.text}</p>
                <div className="svc-list">
                  {list.map((s) => (
                    <article key={s.id} className={`svc svc--${s.category}`}>
                      <h3>{s.name}</h3>
                      <div className="dur">{s.duration}</div>
                      <p>{s.description}</p>
                      {s.features?.length > 0 && (
                        <ul className="ticks">
                          {s.features.map((f) => <li key={f}><Tick />{f}</li>)}
                        </ul>
                      )}
                      <div className="svc-foot">
                        <span className="price">{formatINR(s.price)}</span>
                        <BookButton service={s} variant={s.category === "demo" ? "btn--gold" : ""} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
