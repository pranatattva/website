"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { formatINR, formatRange } from "@/lib/format";

const MODES = ["In-person", "Online", "Hybrid"];

export default function Page() {
  return (
    <ResourceManager
      table="classes"
      title="Courses"
      singular="Course"
      description="Course batches shown on the Schedule and Courses pages. Name a batch after the course (e.g. Basic Pranic Healing) so it appears under that course. Switch on Past to move it to the Past tab."
      orderBy={{ column: "start_date", ascending: false }}
      searchKeys={["title", "instructor", "venue"]}
      toggles={[{ key: "is_published", label: "Visible" }, { key: "is_past", label: "Past", tone: "past" }]}
      defaults={{ mode: "In-person", venue: "Pranatattva centre, Baner", is_published: true, is_past: false, fee: 0 }}
      columns={[
        { key: "title", label: "Course", render: (r) => <strong>{r.title}</strong> },
        { key: "start_date", label: "Dates", render: (r) => formatRange(r.start_date, r.end_date) },
        { key: "instructor", label: "Instructor" },
        { key: "fee", label: "Fee", render: (r) => formatINR(r.fee) },
      ]}
      fields={[
        { name: "title", label: "Course name", type: "text", required: true, full: true, placeholder: "e.g. Basic Pranic Healing" },
        { name: "level", label: "Level or prerequisite", type: "text", placeholder: "e.g. Beginner, After Level 1" },
        { name: "instructor", label: "Instructor", type: "text" },
        { name: "start_date", label: "Start date", type: "date", required: true },
        { name: "end_date", label: "End date", type: "date", help: "Leave blank for one-day courses" },
        { name: "time_text", label: "Timing", type: "text", placeholder: "9:30 am – 5:30 pm" },
        { name: "mode", label: "Mode", type: "select", options: MODES, required: true },
        { name: "venue", label: "Venue", type: "text", full: true },
        { name: "fee", label: "Fee (₹)", type: "number", help: "0 shows as Free. Leave blank to hide the fee." },
        { name: "seats", label: "Seats", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "registration_url", label: "Registration link", type: "url", full: true, help: "Optional. If blank, visitors see a Reserve a seat button that opens WhatsApp." },
        { name: "image_url", label: "Image", type: "image" },
        { name: "is_published", label: "Show on website", type: "checkbox" },
        { name: "is_past", label: "Mark as past", type: "checkbox" },
      ]}
    />
  );
}
