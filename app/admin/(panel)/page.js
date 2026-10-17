"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabase/browser";
import { todayISO } from "@/lib/format";

export default function Overview() {
  const sb = getBrowserClient();
  const [c, setC] = useState(null);

  useEffect(() => {
    const t = todayISO();
    const count = (q) => q.then((r) => r.count ?? 0);
    Promise.all([
      count(sb.from("classes").select("id", { count: "exact", head: true }).eq("is_past", false).or(`end_date.gte.${t},start_date.gte.${t}`)),
      count(sb.from("events").select("id", { count: "exact", head: true }).eq("is_past", false).gte("event_date", t)),
      count(sb.from("bookings").select("id", { count: "exact", head: true }).in("status", ["pending", "confirmed"])),
      count(sb.from("orders").select("id", { count: "exact", head: true }).eq("kind", "product").eq("status", "paid")),
      count(sb.from("messages").select("id", { count: "exact", head: true }).eq("is_read", false)),
      count(sb.from("gallery").select("id", { count: "exact", head: true })),
      count(sb.from("testimonials").select("id", { count: "exact", head: true })),
    ]).then(([classes, events, bookings, orders, messages, gallery, testimonials]) => setC({ classes, events, bookings, orders, messages, gallery, testimonials }));
  }, [sb]);

  const cards = [
    { label: "Upcoming courses", value: c?.classes, href: "/admin/classes", action: "Manage courses" },
    { label: "Upcoming events", value: c?.events, href: "/admin/events", action: "Manage events" },
    { label: "Bookings to schedule", value: c?.bookings, href: "/admin/bookings", action: "View bookings" },
    { label: "Orders to ship", value: c?.orders, href: "/admin/orders", action: "View orders" },
    { label: "Unread messages", value: c?.messages, href: "/admin/messages", action: "Read messages" },
    { label: "Gallery photos", value: c?.gallery, href: "/admin/gallery", action: "Add photos" },
    { label: "Testimonials", value: c?.testimonials, href: "/admin/testimonials", action: "Add testimonials" },
  ];

  return (
    <div>
      <div className="adm-head"><div><h1>Overview</h1><p className="muted">Changes you make here appear on the website within a few seconds.</p></div></div>
      <div className="adm-cards">
        {cards.map((k) => (
          <Link key={k.label} href={k.href} className="adm-card">
            <span className="adm-card-num">{k.value ?? "…"}</span>
            <span>{k.label}</span>
            <span className="text-link small">{k.action}</span>
          </Link>
        ))}
      </div>
      <div className="note" style={{ marginTop: 32 }}>
        <p><strong>Tip:</strong> courses and events move to the "Past" tab by themselves once their date passes, or straight away when you switch on "Past". Turn off "Visible" to hide something without deleting it.</p>
      </div>
    </div>
  );
}
