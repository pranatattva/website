import PageHero from "@/components/PageHero";
import ScheduleList from "@/components/ScheduleList";
import { scheduleNav } from "@/components/scheduleNav";
import { getClasses } from "@/lib/data";

export const revalidate = 60;
export const metadata = { title: "Pranic Healing classes", description: "Certified Pranic Healing courses in Baner, Pune: Basic, Advanced, Pranic Psychotherapy, Crystal Healing and more." };

export default async function ClassesPage() {
  const items = await getClasses();
  return (
    <>
      <PageHero
        title="Classes"
        lede="Certified courses following Grand Master Choa Kok Sui's curriculum. Start with Basic Pranic Healing; no experience needed."
        crumbs={[{ label: "Schedule", href: "/schedule" }, { label: "Classes" }]}
        subnav={scheduleNav}
        active="/schedule/classes"
      />
      <section className="section">
        <div className="wrap">
          <ScheduleList items={items} emptyText="No classes are scheduled right now." />
          <div className="note" style={{ marginTop: 32 }}>
            <p>Seats are kept small so everyone gets personal guidance during practice. Course materials and certification details are shared when you register.</p>
          </div>
        </div>
      </section>
    </>
  );
}
