import Link from "next/link";
import PageHero from "@/components/PageHero";
import Decor from "@/components/Decor";
import JumpCapsules from "@/components/JumpCapsules";
import { Medal, Tick, IcBook, IcCalendar, WhatsApp } from "@/components/Icons";
import { BATCH_WINDOW_DAYS, courses, matchCourse } from "@/lib/courses";
import { getClasses } from "@/lib/data";
import { formatINR, formatRange, todayISO } from "@/lib/format";
import { waLink } from "@/lib/site";
import { googleLink } from "@/lib/google-link";

export const revalidate = 60;
export const metadata = {
  title: "Pranic Healing courses",
  description: "Basic and Advanced Pranic Healing, Pranic Psychotherapy, Achieving Oneness with the Higher Soul and Arhatic Yoga at Pranatattva, Baner, Pune.",
};

function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export default async function CoursesPage() {
  const batches = await getClasses();
  // Only show batches that start within the next BATCH_WINDOW_DAYS days
  const until = addDays(todayISO(), BATCH_WINDOW_DAYS);
  const batchesFor = (c) => batches.filter((b) => matchCourse(b.title)?.slug === c.slug && b.start_date <= until);

  return (
    <>
      <PageHero
        title="Courses"
        lede="Learn Pranic Healing step by step, exactly as Grand Master Choa Kok Sui taught it. Everyone begins with Basic Pranic Healing."
        crumbs={[{ label: "Courses" }]}
      />

      <div className="shop-flow">
        <JumpCapsules items={courses.map((c) => ({ id: c.slug, label: c.short }))} />

        <section className="section" style={{ paddingTop: 24 }}>
          <Decor preset="a" />
          <div className="wrap">
            {courses.map((c) => {
              const upcoming = batchesFor(c);
              return (
                <article key={c.slug} id={c.slug} className="course card">
                  <div className="course-head">
                    <Medal><IcBook /></Medal>
                    <div>
                      <span className="course-level">{c.level}</span>
                      <h2>{c.name}</h2>
                    </div>
                  </div>
                  <p className="lede">{c.summary}</p>

                  <div className="course-grid">
                    <div>
                      <h3>What you'll learn</h3>
                      <ul className="ticks">{c.learn.map((l) => <li key={l}><Tick />{l}</li>)}</ul>
                    </div>
                    <aside className="course-facts">
                      <dl>
                        <dt>Prerequisite</dt><dd>{c.prerequisite}</dd>
                        {c.duration && <><dt>Duration</dt><dd>{c.duration}</dd></>}
                        <dt>Suited to</dt><dd>{c.forWhom}</dd>
                      </dl>
                      <div className="course-batches">
                        <h4><IcCalendar />Upcoming batches</h4>
                        {upcoming.length ? (
                          <ul>
                            {upcoming.map((b) => {
                              const g = googleLink(b);
                              return (
                                <li key={b.id}>
                                  <strong>{formatRange(b.start_date, b.end_date)}</strong>
                                  <span>{[b.time_text, b.mode, formatINR(b.fee)].filter(Boolean).join(", ")}</span>
                                  {g && <a className="meta-link small" href={g.href} target="_blank" rel="noopener noreferrer">{g.label}</a>}
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <p className="muted small">Message us to join the waiting list</p>
                        )}
                      </div>
                      <a className="btn btn--wa btn--block" href={waLink(`Hi Pranatattva, I'd like to reserve a seat for the ${c.name} course.`)} target="_blank" rel="noopener noreferrer">
                        <WhatsApp width={18} height={18} />Reserve a seat
                      </a>
                    </aside>
                  </div>
                </article>
              );
            })}

            <p className="small muted center" style={{ marginTop: 32 }}>
              Course content follows Grand Master Choa Kok Sui's curriculum. Details of each batch are shared on registration. See all dates on the <Link href="/schedule#courses">schedule</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
