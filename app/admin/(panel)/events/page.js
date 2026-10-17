"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { formatDate, formatINR } from "@/lib/format";

export default function Page() {
  return (
    <ResourceManager
      table="events"
      title="Events"
      singular="Event"
      description="Healing camps, meditations, talks and workshops. Events move to the Past tab once their date passes, or when you switch on Past."
      orderBy={{ column: "event_date", ascending: false }}
      searchKeys={["title", "venue"]}
      toggles={[{ key: "is_published", label: "Visible" }, { key: "is_past", label: "Past", tone: "past" }]}
      defaults={{ mode: "In-person", venue: "Pranatattva centre, Baner", is_published: true, is_past: false, fee: 0 }}
      columns={[
        { key: "title", label: "Event", render: (r) => <strong>{r.title}</strong> },
        { key: "event_date", label: "Date", render: (r) => formatDate(r.event_date) },
        { key: "time_text", label: "Time" },
        { key: "fee", label: "Fee", render: (r) => formatINR(r.fee) },
      ]}
      fields={[
        { name: "title", label: "Event name", type: "text", required: true, full: true },
        { name: "event_date", label: "Date", type: "date", required: true },
        { name: "time_text", label: "Timing", type: "text", placeholder: "7:00 pm – 8:00 pm" },
        { name: "mode", label: "Mode", type: "select", options: ["In-person", "Online", "Hybrid"], required: true },
        { name: "fee", label: "Fee (₹)", type: "number", help: "0 shows as Free. Leave blank to hide the fee." },
        { name: "venue", label: "Venue", type: "text", full: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "registration_url", label: "Registration or Zoom link", type: "url", full: true },
        { name: "image_url", label: "Image", type: "image" },
        { name: "is_published", label: "Show on website", type: "checkbox" },
        { name: "is_past", label: "Mark as past", type: "checkbox" },
      ]}
    />
  );
}
