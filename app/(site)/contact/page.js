import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Clock, Instagram, Mail, Phone, Pin, WhatsApp } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata = { title: "Contact", description: "Visit Pranatattva Pranic Healing Centre at Ambrosia Galaxy, Baner, Pune, or send us a message." };

export default function ContactPage({ searchParams }) {
  const subject = typeof searchParams?.subject === "string" ? searchParams.subject.slice(0, 200) : "";
  return (
    <>
      <PageHero title="Contact us" lede="Questions about a session, a course or an order? Write to us, call, or drop in at the centre." crumbs={[{ label: "Contact" }]} />
      <section className="section">
        <div className="wrap contact-grid">
          <div>
            <ul className="contact-list">
              <li>
                <span className="ic"><Pin /></span>
                <div>
                  <h3>Address</h3>
                  <p>{site.address.name}<br />{site.address.line1}<br />{site.address.line2}</p>
                  <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="text-link small">Open in Google Maps</a>
                </div>
              </li>
              <li><span className="ic"><Phone /></span><div><h3>Phone</h3><a href={site.phoneHref}>{site.phoneDisplay}</a></div></li>
              <li><span className="ic"><WhatsApp /></span><div><h3>WhatsApp</h3><a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a></div></li>
              <li><span className="ic"><Mail /></span><div><h3>Email</h3><a href={`mailto:${site.email}`}>{site.email}</a></div></li>
              <li><span className="ic"><Instagram /></span><div><h3>Instagram</h3><a href={site.instagramHref} target="_blank" rel="noopener noreferrer">{site.instagramHandle}</a></div></li>
              <li>
                <span className="ic"><Clock /></span>
                <div>
                  <h3>Hours</h3>
                  {site.hours.map((h) => <p key={h.days}>{h.days}: {h.time}</p>)}
                </div>
              </li>
            </ul>
            <div className="btn-row" style={{ marginBottom: 32 }}>
              <a href={site.whatsappHref} className="btn btn--gold" target="_blank" rel="noopener noreferrer"><WhatsApp width={20} height={20} />Chat on WhatsApp</a>
            </div>
            <iframe className="map-frame" src={site.mapEmbed} title="Map to Pranatattva centre" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="form-card">
            <h2 style={{ fontSize: "1.8rem" }}>Send a message</h2>
            <p className="muted">We usually reply within one working day.</p>
            <ContactForm defaultSubject={subject} />
          </div>
        </div>
      </section>
    </>
  );
}
