import PageHero from "@/components/PageHero";
import Decor from "@/components/Decor";
import GalleryGrid from "@/components/GalleryGrid";
import { getGallery } from "@/lib/data";
import { site } from "@/lib/site";

export const revalidate = 60;
export const metadata = { title: "Gallery", description: "Moments from healing camps, classes and meditations at Pranatattva, Baner, Pune." };

export default async function GalleryPage() {
  const photos = await getGallery();
  return (
    <>
      <PageHero title="Gallery" lede="Moments from our healing camps, classes and meditations." crumbs={[{ label: "Gallery" }]} />
      <section className="section" style={{ paddingTop: 36 }}>
        <Decor preset="b" />
        <div className="wrap">
          {photos.length ? (
            <GalleryGrid photos={photos} />
          ) : (
            <div className="empty">
              <h3>Photos are coming soon</h3>
              <p>Meanwhile, see our latest moments on Instagram.</p>
              <a href={site.instagramHref} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">Visit {site.instagramHandle}</a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
