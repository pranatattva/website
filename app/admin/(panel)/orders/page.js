"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { formatINR } from "@/lib/format";

const STATUSES = ["created", "paid", "shipped", "delivered", "refunded", "cancelled", "failed"];
const pill = (s) => <span className={`pill pill--${s}`}>{s}</span>;
const when = (d) => new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
const items = (list = []) => (list || []).map((i) => `${i.qty} × ${i.name}`).join(", ");

export default function Page() {
  return (
    <ResourceManager
      table="orders"
      title="Orders"
      singular="Order"
      description="Payments received through Razorpay. 'created' means the customer opened checkout but hasn't paid."
      allowCreate={false}
      allowDelete={false}
      searchKeys={["customer_name", "customer_email", "customer_phone", "razorpay_payment_id"]}
      statusFilter={{ key: "status", options: STATUSES }}
      columns={[
        { key: "created_at", label: "Date", render: (r) => when(r.created_at) },
        { key: "customer_name", label: "Customer", render: (r) => <><strong>{r.customer_name}</strong><br /><span className="muted small">{r.customer_phone}</span></> },
        { key: "items", label: "Items", render: (r) => <span className="small">{r.kind === "service" ? "Service: " : ""}{items(r.items)}</span> },
        { key: "amount", label: "Amount", render: (r) => formatINR(r.amount / 100) },
        { key: "status", label: "Status", render: (r) => pill(r.status) },
      ]}
      fields={[
        { name: "customer_name", label: "Customer", readOnly: true },
        { name: "customer_email", label: "Email", readOnly: true, render: (v) => <a href={`mailto:${v}`}>{v}</a> },
        { name: "customer_phone", label: "Phone", readOnly: true, render: (v) => <a href={`tel:${v}`}>{v}</a> },
        { name: "amount", label: "Amount", readOnly: true, render: (v) => formatINR(v / 100) },
        { name: "items", label: "Items", readOnly: true, full: true, render: (v) => items(v) },
        { name: "shipping_address", label: "Delivery address", readOnly: true, full: true },
        { name: "razorpay_payment_id", label: "Razorpay payment ID", readOnly: true },
        { name: "status", label: "Status", type: "select", options: STATUSES, required: true },
        { name: "admin_notes", label: "Internal notes", type: "textarea", help: "Tracking number, courier, etc." },
      ]}
    />
  );
}
