import { healingTypes, waLink } from "@/lib/site";
import { HealIcon, Medal, WhatsApp } from "@/components/Icons";

export default function HealingTypes() {
  return (
    <ul className="heal-types">
      {healingTypes.map((h) => (
        <li key={h.key}>
          <a className="heal-type" href={waLink(`Hi Pranatattva, I'd like to know more about ${h.title}.`)} target="_blank" rel="noopener noreferrer">
            <div className="ht-head">
              <Medal size="medal--sm"><HealIcon name={h.icon} /></Medal>
              <h3>{h.title}</h3>
            </div>
            <p>{h.text}</p>
            <span className="ht-cta"><WhatsApp width={15} height={15} />Ask about this</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
