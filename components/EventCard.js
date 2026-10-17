import { dateParts, formatDate, formatINR, formatRange } from "@/lib/format";
import { waLink } from "@/lib/site";
import { Clock, Pin, WhatsApp } from "@/components/Icons";

export function reserveLink(it) {
  const start = it.start_date || it.event_date;
  return waLink(`Hi Pranatattva, I'd like to reserve a seat for "${it.title}" on ${formatDate(start)}.`);
}

// Card used in the swipeable "Come and join us" row
export default function EventCard({ it }) {
  const start = it.start_date || it.event_date;
  const { day, month, weekday } = dateParts(start);
  const when = it.start_date ? formatRange(it.start_date, it.end_date) : formatDate(it.event_date);
  const price = formatINR(it.fee);
  return (
    <article className="event-card">
      <div className="ec-top">
        <div className="date-badge" aria-hidden="true"><span className="d">{day}</span><span className="m">{month}</span></div>
        <div>
          {it.kind && <span className={`kind-tag ${it.kind === "Course" ? "kind-tag--course" : ""}`}>{it.kind}</span>}
          <span className="ec-weekday">{weekday}</span>
        </div>
      </div>
      <h3>{it.title}</h3>
      <ul className="meta meta--stack">
        <li><span className="sr-only">Date: </span>{when}</li>
        {it.time_text && <li><Clock />{it.time_text}</li>}
        {it.venue && <li><Pin />{it.venue}</li>}
      </ul>
      <div className="ec-foot">
        {price && <span className={`price ${price === "Free" ? "price--free" : ""}`}>{price}</span>}
        {it.registration_url ? (
          <a href={it.registration_url} className="btn btn--sm" target="_blank" rel="noopener noreferrer">Register</a>
        ) : (
          <a href={reserveLink(it)} className="btn btn--sm btn--wa" target="_blank" rel="noopener noreferrer"><WhatsApp width={16} height={16} />Reserve a seat</a>
        )}
      </div>
    </article>
  );
}
