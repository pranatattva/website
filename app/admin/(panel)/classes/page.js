"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { formatINR, formatRange } from "@/lib/format";

const MODES = ["In-person", "Online", "Hybrid"];

export default function Page() {
  return (
    <ResourceManager
      table="classes"
      title="Classes"
      singular="Class"
      description="Courses shown on the Classes page. Past classes are hidden from the website automatically."
      orderBy={{ column: "start_date", ascending: false }}
      searchKeys={["title", "instructor", "venue"]}
      toggleKey="is_published"
      defaults={{ mode: "In-person", venue: "Pranatattva centre, Baner", is_published: true, fee: 0 }}
      columns={[
        { key: "title", label: "Class", render: (r) => <strong>{r.title}</strong> },
        { key: "start_date", label: "Dates", render: (r) => formatRange(r.start_date, r.end_date) },
        { key: "instructor", label: "Instructor" },
        { key: "fee", label: "Fee", render: (r) => formatINR(r.fee) },
      ]}
      fields={[
        { name: "title", label: "Class name", type: "text", required: true, full: true },
        { name: "level", label: "Level or prerequisite", type: "text", placeholder: "e.g. Beginner, After Level 1" },
        { name: "instructor", label: "Instructor", type: "text" },
        { name: "start_date", label: "Start date", type: "date", required: true },
        { name: "end_date", label: "End date", type: "date", help: "Leave blank for one-day classes" },
        { name: "time_text", label: "Timing", type: "text", placeholder: "9:30 am – 5:30 pm" },
        { name: "mode", label: "Mode", type: "select", options: MODES, required: true },
        { name: "venue", label: "Venue", type: "text", full: true },
        { name: "fee", label: "Fee (₹)", type: "number", help: "0 shows as Free" },
        { name: "seats", label: "Seats", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "registration_url", label: "Registration link", type: "url", full: true, help: "Optional. If blank, visitors see an Enquire button that opens the contact form." },
        { name: "image_url", label: "Image", type: "image" },
        { name: "is_published", label: "Show on website", type: "checkbox" },
      ]}
    />
  );
}
