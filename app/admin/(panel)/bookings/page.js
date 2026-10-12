"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { formatDate, formatINR } from "@/lib/format";

const STATUSES = ["pending", "awaiting_payment", "confirmed", "completed", "cancelled"];
const pill = (s) => <span className={`pill pill--${s}`}>{s.replace(/_/g, " ")}</span>;

export default function Page() {
  return (
    <ResourceManager
      table="bookings"
      title="Bookings"
      singular="Booking"
      description="Session requests from the website. Call or WhatsApp the client to fix the time, then mark it confirmed or completed."
      allowCreate={false}
      searchKeys={["name", "email", "phone", "service_name"]}
      statusFilter={{ key: "status", options: STATUSES }}
      columns={[
        { key: "name", label: "Client", render: (r) => <><strong>{r.name}</strong><br /><a href={`tel:${r.phone}`}>{r.phone}</a></> },
        { key: "service_name", label: "Service" },
        { key: "preferred_date", label: "Preferred", render: (r) => <>{formatDate(r.preferred_date)}<br /><span className="muted small">{r.preferred_time}</span></> },
        { key: "amount", label: "Paid", render: (r) => formatINR(r.amount) },
        { key: "status", label: "Status", render: (r) => pill(r.status) },
      ]}
      fields={[
        { name: "name", label: "Client", readOnly: true },
        { name: "email", label: "Email", readOnly: true, render: (v) => <a href={`mailto:${v}`}>{v}</a> },
        { name: "phone", label: "Phone", readOnly: true, render: (v) => <a href={`tel:${v}`}>{v}</a> },
        { name: "service_name", label: "Service", readOnly: true },
        { name: "preferred_date", label: "Preferred date", readOnly: true, render: (v) => formatDate(v) },
        { name: "preferred_time", label: "Preferred time", readOnly: true },
        { name: "mode", label: "Mode", readOnly: true },
        { name: "amount", label: "Amount", readOnly: true, render: (v) => formatINR(v) },
        { name: "notes", label: "Client's notes", readOnly: true, full: true },
        { name: "status", label: "Status", type: "select", options: STATUSES, required: true },
        { name: "admin_notes", label: "Internal notes", type: "textarea", help: "Only visible to admins" },
      ]}
    />
  );
}
