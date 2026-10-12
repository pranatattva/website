import Link from "next/link";
import { dateParts, formatINR, formatRange, formatDate } from "@/lib/format";
import { Clock, Pin, User, Wave } from "@/components/Icons";

export default function ScheduleList({ items, showKind = false, emptyText }) {
  if (!items.length) {
    return (
      <div className="empty">
        <h3>New dates are on the way</h3>
        <p>{emptyText || "Nothing is scheduled right now."} Follow us on Instagram or write to us and we'll let you know.</p>
        <Link href="/contact" className="btn btn--ghost btn--sm">Ask about upcoming dates</Link>
      </div>
    );
  }
  return (
    <ul className="schedule">
      {items.map((it) => {
        const start = it.start_date || it.event_date;
        const { day, month } = dateParts(start);
        const when = it.start_date ? formatRange(it.start_date, it.end_date) : formatDate(it.event_date, { weekday: "long" });
        const enquire = `/contact?subject=${encodeURIComponent(it.title + " (" + formatDate(start) + ")")}`;
        return (
          <li key={it.id} className="schedule-item">
            <div className="date-badge" aria-hidden="true">
              <span className="d">{day}</span>
              <span className="m">{month}</span>
            </div>
            <div>
              {showKind && it.kind && <span className="kind-tag">{it.kind}</span>}
              <h3>{it.title}</h3>
              {it.description && <p>{it.description}</p>}
              <ul className="meta">
                <li><span className="sr-only">Date: </span>{when}</li>
                {it.time_text && <li><Clock />{it.time_text}</li>}
                {it.venue && <li><Pin />{it.venue}</li>}
                {it.instructor && <li><User />{it.instructor}</li>}
                {it.level && <li><Wave />{it.level}</li>}
              </ul>
            </div>
            <div className="schedule-cta">
              <span className={`price ${!it.fee ? "price--free" : ""}`}>{formatINR(it.fee)}</span>
              {it.registration_url ? (
                <a href={it.registration_url} className="btn btn--sm" target="_blank" rel="noopener noreferrer">Register</a>
              ) : (
                <Link href={enquire} className="btn btn--sm btn--ghost">Enquire</Link>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
