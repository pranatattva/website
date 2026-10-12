import Link from "next/link";
import PageHero from "@/components/PageHero";
import LogoMark from "@/components/LogoMark";
import { getPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const revalidate = 60;
export const metadata = { title: "Blog", description: "Articles on Pranic Healing, meditation and everyday energy hygiene from Pranatattva, Pune." };

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero title="Blog" lede="Notes on healing, meditation and everyday energy hygiene." crumbs={[{ label: "Blog" }]} />
      <section className="section">
        <div className="wrap">
          {posts.length ? (
            <div className="posts">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="post-card">
                  <div className="post-cover">
                    {p.cover_url ? <img src={p.cover_url} alt="" loading="lazy" /> : <><LogoMark size={200} title="" /><span className="cover-word">{p.category}</span></>}
                  </div>
                  <div className="post-body">
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <span className="post-date">{formatDate(p.published_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty"><h3>The first articles are being written</h3><p>Check back soon.</p></div>
          )}
        </div>
      </section>
    </>
  );
}
