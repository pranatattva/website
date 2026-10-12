import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/data";
import { shipping } from "@/lib/site";
import { formatINR } from "@/lib/format";

export const revalidate = 60;
export const metadata = { title: "Oils and salts", description: "Essential oils, cleansing blends, sea salt and salt water bath kits from Pranatattva." };

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <PageHero
        title="Oils and salts"
        lede={`The same oils and salts we use at the centre, for cleansing your home and yourself. Free delivery on orders above ${formatINR(shipping.freeAbove)}.`}
        crumbs={[{ label: "Shop", href: "/shop" }, { label: "Products" }]}
        subnav={[
          { label: "Shop overview", href: "/shop" },
          { label: "Healing services", href: "/shop/services" },
          { label: "Products", href: "/shop/products" },
        ]}
        active="/shop/products"
      />
      <section className="section">
        <div className="wrap">
          {products.length ? <ProductGrid products={products} /> : <div className="empty"><h3>New stock is on the way</h3><p>Please check back soon.</p></div>}
        </div>
      </section>
    </>
  );
}
