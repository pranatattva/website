import { waLink } from "@/lib/site";
import { dateParts, formatINR, formatRange, formatDate } from "@/lib/format";
import { Clock, Pin, User, Wave, WhatsApp } from "@/components/Icons";
import { reserveLink } from "@/components/EventCard";

export default function ScheduleList({ items, showKind = false, emptyText, past = false }) {
  if (!items.length && past) {
    return <div className="empty"><p style={{ margin: 0 }}>{emptyText}</p></div>;
  }
  if (!items.length) {
    return (
      <div className="empty">
        <h3>New dates are on the way</h3>
        <p>{emptyText || "Nothing is scheduled right now."} Follow us on Instagram or write to us and we'll let you know.</p>
        <a href={waLink("Hi Pranatattva, when are your next courses and events?")} className="btn btn--sm btn--wa" target="_blank" rel="noopener noreferrer"><WhatsApp width={16} height={16} />Ask about upcoming dates</a>
      </div>
    );
  }
  return (
    <ul className="schedule">
      {items.map((it) => {
        const start = it.start_date || it.event_date;
        const { day, month } = dateParts(start);
        const when = it.start_date ? formatRange(it.start_date, it.end_date) : formatDate(it.event_date, { weekday: "long" });
        return (
          <li key={it.id} className={`schedule-item ${past ? "is-past" : ""}`}>
            <div className="date-badge" aria-hidden="true">
              <span className="d">{day}</span>
              <span className="m">{month}</span>
            </div>
            <div>
              {showKind && it.kind && <span className={`kind-tag ${it.kind === "Course" ? "kind-tag--course" : ""}`}>{it.kind}</span>}
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
            {past ? (
              <div className="schedule-cta"><span className="past-tag">Completed</span></div>
            ) : (
            <div className="schedule-cta">
              {formatINR(it.fee) && <span className={`price ${formatINR(it.fee) === "Free" ? "price--free" : ""}`}>{formatINR(it.fee)}</span>}
              {it.registration_url ? (
                <a href={it.registration_url} className="btn btn--sm" target="_blank" rel="noopener noreferrer">Register</a>
              ) : (
                <a href={reserveLink(it)} className="btn btn--sm btn--wa" target="_blank" rel="noopener noreferrer"><WhatsApp width={16} height={16} />Reserve a seat</a>
              )}
            </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
