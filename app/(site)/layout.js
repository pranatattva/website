import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TouchHover from "@/components/TouchHover";
import { CartProvider } from "@/components/CartProvider";
import { getProducts } from "@/lib/data";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: site.fullName,
  email: site.email,
  telephone: site.phoneDisplay,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Baner, Pune",
    postalCode: "411045",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
};

export default async function SiteLayout({ children }) {
  const products = await getProducts();
  const hasProducts = products.length > 0;
  return (
    <CartProvider>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header hasProducts={hasProducts} />
      <main id="main">{children}</main>
      <Footer hasProducts={hasProducts} />
      <TouchHover />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </CartProvider>
  );
}
