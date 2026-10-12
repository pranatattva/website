import { getPosts } from "@/lib/data";
import { site } from "@/lib/site";

export default async function sitemap() {
  const pages = [
    "", "/about", "/about/master-choa-kok-sui", "/about/pranic-healing", "/about/pragati-pullewar", "/about/santosh-pullewar",
    "/schedule", "/schedule/classes", "/schedule/events", "/shop", "/shop/services", "/shop/products", "/blog", "/contact",
    "/policies/privacy", "/policies/refund", "/policies/terms",
  ].map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" }));
  const posts = (await getPosts()).map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.published_at }));
  return [...pages, ...posts];
}
