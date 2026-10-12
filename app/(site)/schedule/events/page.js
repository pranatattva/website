import PageHero from "@/components/PageHero";
import ScheduleList from "@/components/ScheduleList";
import { scheduleNav } from "@/components/scheduleNav";
import { getEvents } from "@/lib/data";

export const revalidate = 60;
export const metadata = { title: "Events", description: "Free healing camps, full moon meditations and workshops at Pranatattva, Baner, Pune." };

export default async function EventsPage() {
  const items = await getEvents();
  return (
    <>
      <PageHero
        title="Events"
        lede="Free healing camps, full moon Twin Hearts meditations, talks and workshops. Everyone is welcome."
        crumbs={[{ label: "Schedule", href: "/schedule" }, { label: "Events" }]}
        subnav={scheduleNav}
        active="/schedule/events"
      />
      <section className="section">
        <div className="wrap">
          <ScheduleList items={items} emptyText="No events are scheduled right now." />
        </div>
      </section>
    </>
  );
}
