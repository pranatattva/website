import Link from "next/link";
import PageHero from "@/components/PageHero";
import { shopNav } from "@/components/shopNav";
import { ProductArt } from "@/components/Art";
import LogoMark from "@/components/LogoMark";

export const metadata = { title: "Shop", description: "Book Pranic Healing sessions and packages, or buy cleansing oils and salts." };

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="Online shop"
        lede="Book a healing session or package, or order the oils and salts we use at the centre."
        crumbs={[{ label: "Shop" }]}
        subnav={shopNav}
        active="/shop"
      />
      <section className="section">
        <div className="wrap healers">
          <Link href="/shop/services" className="healer-card">
            <div className="portrait" style={{ background: "var(--lavender)", display: "grid", placeItems: "center" }}>
              <LogoMark size={96} title="" />
            </div>
            <div>
              <h3>Healing services</h3>
              <p className="role">A free discovery call, single sessions in person or by distance, and money-saving packages.</p>
              <span className="text-link">Book a session</span>
            </div>
          </Link>
          <Link href="/shop/products" className="healer-card">
            <div className="portrait" style={{ background: "#f5ecdc", display: "grid", placeItems: "center" }}>
              <div style={{ width: "60%" }}><ProductArt category="Oils" /></div>
            </div>
            <div>
              <h3>Oils and salts</h3>
              <p className="role">Essential oils, cleansing blends, sea salt and bath kits, delivered across India.</p>
              <span className="text-link">Shop products</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
