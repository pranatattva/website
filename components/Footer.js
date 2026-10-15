import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { site } from "@/lib/site";
import { Instagram, WhatsApp, Mail } from "@/components/Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Pranatattva home">
              <LogoMark size={46} />
              <span className="brand-name">Pranatattva</span>
            </Link>
            <p style={{ marginTop: 14 }}>
              A Pranic Healing centre in Baner, Pune. Healing sessions, classes, meditations and free healing camps.
            </p>
            <div className="socials">
              <a href={site.instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsApp /></a>
              <a href={`mailto:${site.email}`} aria-label="Email"><Mail /></a>
            </div>
          </div>

          <div>
            <h2>Explore</h2>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/about/pranic-healing">Pranic Healing</Link></li>
              <li><Link href="/schedule#classes">Classes</Link></li>
              <li><Link href="/schedule#events">Events</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h2>Shop</h2>
            <ul>
              <li><Link href="/shop#healings">Book a healing</Link></li>
              <li><Link href="/shop#products">Oils and salts</Link></li>
              <li><Link href="/cart">Your cart</Link></li>
            </ul>
          </div>

          <div>
            <h2>Visit</h2>
            <address>
              {site.address.name}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
            </address>
            <ul style={{ marginTop: 12 }}>
              <li><a href={site.mapsHref} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></li>
              <li><a href={site.phoneHref}>Call {site.phoneDisplay}</a></li>
              <li><a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp {site.whatsappDisplay}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
        </div>

        <p className="disclaimer">
          Pranic Healing is a complementary practice and is not a substitute for medical diagnosis or treatment. Please continue to consult your doctor for any health concern.
        </p>

        <div className="footer-bottom">
          <p>© {year} Pranatattva Pranic Healing Centre</p>
          <nav aria-label="Policies">
            <Link href="/policies/privacy">Privacy policy</Link>
            <Link href="/policies/refund">Refund policy</Link>
            <Link href="/policies/terms">Terms and conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
