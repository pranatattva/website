import PageHero from "@/components/PageHero";
import CartView from "@/components/CartView";

export const metadata = { title: "Your cart", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <PageHero title="Your cart" crumbs={[{ label: "Shop", href: "/shop" }, { label: "Cart" }]} />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <CartView />
        </div>
      </section>
    </>
  );
}
