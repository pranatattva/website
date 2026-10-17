import PageHero from "@/components/PageHero";
import Decor from "@/components/Decor";
import BookButton from "@/components/BookButton";
import ProductGrid from "@/components/ProductGrid";
import JumpCapsules from "@/components/JumpCapsules";
import { Medal, Tick, IcHands, IcDrop, IcSpark, WhatsApp } from "@/components/Icons";
import HealingTypes from "@/components/HealingTypes";
import { getProducts, getServices } from "@/lib/data";
import { formatINR } from "@/lib/format";
import { shipping, waLink } from "@/lib/site";

export const revalidate = 60;
export const metadata = {
  title: "Services & Store",
  description: "Book a free discovery call, a Pranic Healing session or a healing package, and order cleansing oils and salts from Pranatattva, Pune.",
};

const GROUPS = [
  { key: "package", title: "Healing packages", text: "For lasting change, regular sessions work best. Packages save you money and keep you on track." },
  { key: "session", title: "Single sessions", text: "Come to the centre in Baner or receive healing by distance, wherever you are." },
  { key: "demo", title: "Not sure yet?", text: "A short, free conversation to understand what you need before you commit to anything." },
];

export default async function ShopPage() {
  const [services, products] = await Promise.all([getServices(), getProducts()]);
  return (
    <>
      <PageHero
        title="Services & Store"
        lede="Healing for every part of life, packages and sessions you can book online, and the oils and salts we use at the centre."
        crumbs={[{ label: "Services & Store" }]}
      />

      <div className="shop-flow">
      <JumpCapsules items={[{ id: "healings", label: "Healing services" }, ...(products.length ? [{ id: "products", label: "Oils and salts" }] : [])]} />
      <section className="section" id="healings" style={{ paddingTop: 24 }}>
        <Decor preset="a" />
        <div className="wrap">

          <div className="block-head" id="healing-types">
            <Medal size="medal--sm"><IcSpark /></Medal>
            <div>
              <h2>Healing for every part of life</h2>
              <p>Pranic Healing can support you in many areas. Tap any type to ask us about it on WhatsApp.</p>
            </div>
          </div>
          <HealingTypes />

          <div className="block-head" style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
            <Medal size="medal--sm"><IcHands /></Medal>
            <div>
              <h2>Packages and sessions</h2>
              <p>Choose a package or session and pick a preferred date and time. We'll confirm the exact slot by phone or WhatsApp.</p>
            </div>
          </div>

          {GROUPS.map((g) => {
            const list = services.filter((s) => s.category === g.key);
            if (!list.length) return null;
            return (
              <div key={g.key} className="svc-group">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)", marginBottom: 6 }}>{g.title}</h3>
                <p>{g.text}</p>
                <div className="svc-list">
                  {list.map((s) => (
                    <article key={s.id} className={`svc svc--${s.category}`}>
                      <h3>{s.name}</h3>
                      <div className="dur">{s.duration}</div>
                      <p>{s.description}</p>
                      {s.features?.length > 0 && (
                        <ul className="ticks">{s.features.map((f) => <li key={f}><Tick />{f}</li>)}</ul>
                      )}
                      <div className="svc-foot">
                        {s.price === null || s.price === undefined ? (
                          <>
                            <span className="price price--ask">Price on request</span>
                            <a className="btn btn--sm btn--wa" href={waLink(`Hi Pranatattva, I'd like to know more about the ${s.name}.`)} target="_blank" rel="noopener noreferrer"><WhatsApp width={16} height={16} />Message us</a>
                          </>
                        ) : (
                          <>
                            <span className="price">{formatINR(s.price)}</span>
                            <BookButton service={s} variant={s.category === "demo" ? "btn--gold" : ""} />
                          </>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {products.length > 0 && (
      <section className="section section--lavender" id="products">
        <Decor preset="b" />
        <div className="wrap">
          <div className="block-head">
            <Medal size="medal--sm"><IcDrop /></Medal>
            <div>
              <h2>Oils and salts</h2>
              <p>For cleansing your home and yourself. Free delivery on orders above {formatINR(shipping.freeAbove)}.</p>
            </div>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>
      )}
      </div>
    </>
  );
}
