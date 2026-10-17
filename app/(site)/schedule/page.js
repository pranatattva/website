import PageHero from "@/components/PageHero";
import Decor from "@/components/Decor";
import ScheduleTabs from "@/components/ScheduleTabs";
import { getClasses, getEvents, getPastClasses, getPastEvents } from "@/lib/data";

export const revalidate = 60;
export const metadata = {
  title: "Schedule: courses and events",
  description: "Upcoming Pranic Healing courses, free healing camps and full moon meditations at Pranatattva, Baner, Pune.",
};

export default async function SchedulePage() {
  const [classes, events, pastClasses, pastEvents] = await Promise.all([getClasses(), getEvents(), getPastClasses(), getPastEvents()]);
  return (
    <>
      <PageHero
        title="Schedule"
        lede="Courses to learn Pranic Healing, and events to experience it. Courses need registration; most events are free and open to all."
        crumbs={[{ label: "Schedule" }]}
      />
      <section className="section" style={{ paddingTop: 36 }}>
        <Decor preset="b" />
        <div className="wrap">
          <ScheduleTabs upcoming={{ classes, events }} past={{ classes: pastClasses, events: pastEvents }} />
        </div>
      </section>
    </>
  );
}
