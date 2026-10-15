"use client";
import { useEffect, useState } from "react";
import ScheduleList from "@/components/ScheduleList";
import { Medal, IcBook, IcSpark } from "@/components/Icons";

export default function ScheduleTabs({ upcoming, past }) {
  const [view, setView] = useState("upcoming");
  const data = view === "upcoming" ? upcoming : past;
  const isPast = view === "past";

  // Allow links like /schedule?view=past
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "past") setView("past");
  }, []);

  return (
    <>
      <div className="capsule-bar">
        <div className="capsules" role="tablist" aria-label="Show upcoming or past">
          <button type="button" role="tab" aria-selected={view === "upcoming"} onClick={() => setView("upcoming")}>Upcoming</button>
          <button type="button" role="tab" aria-selected={view === "past"} onClick={() => setView("past")}>Past</button>
        </div>
      </div>

      <div role="tabpanel">
        <div className="block" id="classes">
          <div className="block-head">
            <Medal size="medal--sm"><IcBook /></Medal>
            <div>
              <h2>{isPast ? "Past classes" : "Classes"}</h2>
              <p>{isPast ? "Courses we've held recently." : "Certified courses following Grand Master Choa Kok Sui's curriculum. Start with Basic Pranic Healing."}</p>
            </div>
          </div>
          <ScheduleList items={data.classes} past={isPast} emptyText={isPast ? "Past classes will appear here." : "No classes are scheduled right now."} />
        </div>

        <div className="block" id="events">
          <div className="block-head">
            <Medal size="medal--sm"><IcSpark /></Medal>
            <div>
              <h2>{isPast ? "Past events" : "Events"}</h2>
              <p>{isPast ? "Camps, meditations and talks we've held recently." : "Free healing camps, full moon meditations, talks and workshops. Everyone is welcome."}</p>
            </div>
          </div>
          <ScheduleList items={data.events} past={isPast} emptyText={isPast ? "Past events will appear here." : "No events are scheduled right now."} />
        </div>
      </div>
    </>
  );
}
