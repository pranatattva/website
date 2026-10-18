"use client";
import { useEffect, useState } from "react";
import ScheduleList from "@/components/ScheduleList";
import { Medal, IcBook, IcSpark } from "@/components/Icons";

const TABS = [
  { id: "courses", label: "Courses", icon: <IcBook />, key: "classes", none: "No courses are scheduled right now.", nonePast: "Past courses will appear here." },
  { id: "events", label: "Events", icon: <IcSpark />, key: "events", none: "No events are scheduled right now.", nonePast: "Past events will appear here." },
];

export default function ScheduleTabs({ upcoming, past }) {
  const [tab, setTab] = useState("courses");
  const [when, setWhen] = useState({ courses: "upcoming", events: "upcoming" });

  // Links like /schedule#events open the right tab
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (TABS.some((t) => t.id === h)) setTab(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const choose = (id) => {
    setTab(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <div className="capsule-bar">
        <div className="capsules" role="tablist" aria-label="Courses or events">
          {TABS.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} onClick={() => choose(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      {TABS.map((t) => {
        const isPast = when[t.id] === "past";
        const items = (isPast ? past : upcoming)[t.key];
        return (
          <div key={t.id} id={t.id} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={tab !== t.id} className="block">
            <div className="block-head block-head--split">
              <div className="block-head-title">
                <Medal size="medal--sm">{t.icon}</Medal>
                <h2 id={`tab-${t.id}`}>{isPast ? `Past ${t.label.toLowerCase()}` : t.label}</h2>
              </div>
              <div className="capsules capsules--sm" role="group" aria-label={`Upcoming or past ${t.label.toLowerCase()}`}>
                <button type="button" aria-pressed={!isPast} onClick={() => setWhen((w) => ({ ...w, [t.id]: "upcoming" }))}>Upcoming</button>
                <button type="button" aria-pressed={isPast} onClick={() => setWhen((w) => ({ ...w, [t.id]: "past" }))}>Past</button>
              </div>
            </div>
            <ScheduleList items={items} past={isPast} emptyText={isPast ? t.nonePast : t.none} />
          </div>
        );
      })}
    </>
  );
}
