"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { formatINR } from "@/lib/format";

const CATS = [
  { value: "demo", label: "Start here (free call or demo)" },
  { value: "session", label: "Single session" },
  { value: "package", label: "Package" },
];

export default function Page() {
  return (
    <ResourceManager
      table="services"
      title="Services"
      singular="Service"
      description="Healing services customers can book and pay for on the website."
      orderBy={{ column: "sort_order", ascending: true }}
      searchKeys={["name"]}
      toggleKey="is_active"
      defaults={{ category: "session", is_active: true, sessions: 1 }}
      columns={[
        { key: "name", label: "Service", render: (r) => <strong>{r.name}</strong> },
        { key: "category", label: "Type", render: (r) => CATS.find((c) => c.value === r.category)?.label },
        { key: "duration", label: "Duration" },
        { key: "price", label: "Price", render: (r) => formatINR(r.price) || <span className="muted">On request</span> },
      ]}
      fields={[
        { name: "name", label: "Service name", type: "text", required: true, full: true },
        { name: "category", label: "Type", type: "select", options: CATS, required: true },
        { name: "slug", label: "Slug", type: "slug" },
        { name: "duration", label: "Duration", type: "text", placeholder: "60 minutes or 5 sessions" },
        { name: "sessions", label: "Number of sessions", type: "number" },
        { name: "price", label: "Price (₹)", type: "number", help: "Leave blank to hide the price and show a Message us on WhatsApp button. 0 makes it a free request." },
        { name: "sort_order", label: "Display order", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "features", label: "Highlights", type: "list", help: "One per line" },
        { name: "is_active", label: "Show on website", type: "checkbox" },
      ]}
    />
  );
}
