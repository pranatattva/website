import PageHero from "@/components/PageHero";
import ScheduleList from "@/components/ScheduleList";
import { scheduleNav } from "@/components/scheduleNav";
import { getUpcoming } from "@/lib/data";

export const revalidate = 60;
export const metadata = { title: "Schedule", description: "Upcoming Pranic Healing classes, healing camps and meditations at Pranatattva, Baner, Pune." };

export default async function SchedulePage() {
  const items = await getUpcoming(50);
  return (
    <>
      <PageHero
        title="Schedule"
        lede="Everything happening at the centre, in date order. Classes need registration; most events are free and open to all."
        crumbs={[{ label: "Schedule" }]}
        subnav={scheduleNav}
        active="/schedule"
      />
      <section className="section">
        <div className="wrap">
          <ScheduleList items={items} showKind />
        </div>
      </section>
    </>
  );
}
