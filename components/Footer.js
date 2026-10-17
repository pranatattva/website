import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { site } from "@/lib/site";
import { Instagram, WhatsApp, Mail, Phone } from "@/components/Icons";

export default function Footer({ hasProducts = true }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Pranatattva home">
              <LogoMark size={38} />
              <span className="brand-name">Pranatattva</span>
            </Link>
            <p>Pranic Healing centre in Baner, Pune.</p>
            <div className="socials">
              <a href={site.instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsApp /></a>
              <a href={site.phoneHref} aria-label="Call"><Phone /></a>
              <a href={`mailto:${site.email}`} aria-label="Email"><Mail /></a>
            </div>
          </div>

          <nav aria-label="Explore">
            <h2>Explore</h2>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/schedule">Schedule</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2>Services</h2>
            <ul>
              <li><Link href="/shop#healings">Healing services</Link></li>
              {hasProducts && <li><Link href="/shop#products">Oils and salts</Link></li>}
              {hasProducts && <li><Link href="/cart">Cart</Link></li>}
            </ul>
          </nav>

          <div className="footer-visit">
            <h2>Visit</h2>
            <address>{site.address.line1}, {site.address.line2}</address>
            <ul>
              <li><a href={site.mapsHref} target="_blank" rel="noopener noreferrer">Google Maps</a></li>
              <li><a href={site.phoneHref}>{site.phoneDisplay}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Pranatattva. Pranic Healing complements medical care and does not replace it.</p>
          <nav aria-label="Policies">
            <Link href="/policies/privacy">Privacy</Link>
            <Link href="/policies/refund">Refunds</Link>
            <Link href="/policies/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
