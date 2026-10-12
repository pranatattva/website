"use client";
import ResourceManager from "@/components/admin/ResourceManager";

const when = (d) => new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

export default function Page() {
  return (
    <ResourceManager
      table="messages"
      title="Messages"
      singular="Message"
      description="Enquiries from the contact form. Tick 'Read' once you've replied."
      allowCreate={false}
      searchKeys={["name", "email", "subject", "message"]}
      columns={[
        { key: "created_at", label: "Received", render: (r) => when(r.created_at) },
        { key: "name", label: "From", render: (r) => <>{!r.is_read && <span className="dot" aria-label="Unread" />}<strong>{r.name}</strong><br /><span className="muted small">{r.email}</span></> },
        { key: "subject", label: "Subject" },
      ]}
      fields={[
        { name: "name", label: "From", readOnly: true },
        { name: "email", label: "Email", readOnly: true, render: (v) => <a href={`mailto:${v}`}>{v}</a> },
        { name: "phone", label: "Phone", readOnly: true },
        { name: "subject", label: "Subject", readOnly: true },
        { name: "message", label: "Message", readOnly: true, full: true, render: (v) => <span style={{ whiteSpace: "pre-wrap" }}>{v}</span> },
        { name: "is_read", label: "Read", type: "checkbox" },
      ]}
    />
  );
}
