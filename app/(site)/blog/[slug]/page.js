import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import RichText from "@/components/RichText";
import { getPost, getPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: post.cover_url ? [post.cover_url] : [] },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const more = (await getPosts({ limit: 4 })).filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero title={post.title} crumbs={[{ label: "Blog", href: "/blog" }, { label: post.category || "Article" }]}>
        <p className="article-meta" style={{ marginTop: 14 }}>
          {formatDate(post.published_at)}{post.author ? `, by ${post.author}` : ""}
        </p>
      </PageHero>
      <article className="section" style={{ paddingTop: 40 }}>
        <div className="wrap narrow">
          {post.cover_url && <img src={post.cover_url} alt="" style={{ borderRadius: 24, marginBottom: 36, width: "100%" }} />}
          <RichText text={post.content || ""} />
          <div className="note" style={{ marginTop: 40 }}>
            <p>Pranic Healing complements medical care and does not replace it. Questions about your own situation? <Link href="/shop/services">Book a free discovery call.</Link></p>
          </div>
          {more.length > 0 && (
            <div style={{ marginTop: 56 }}>
              <h2 style={{ fontSize: "1.5rem" }}>Keep reading</h2>
              <ul style={{ paddingLeft: "1.2em" }}>
                {more.map((p) => <li key={p.id}><Link href={`/blog/${p.slug}`}>{p.title}</Link></li>)}
              </ul>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
