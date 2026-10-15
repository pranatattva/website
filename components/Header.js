"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LogoMark from "@/components/LogoMark";
import { nav, site } from "@/lib/site";
import { useCart } from "@/components/CartProvider";
import { Bag, Chevron, Close, Menu, Instagram, WhatsApp } from "@/components/Icons";

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [openAcc, setOpenAcc] = useState(null);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setDrawer(false);
      }
    };
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const enter = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wrap header-inner">
          <Link href="/" className="brand" aria-label="Pranatattva home">
            <LogoMark size={40} />
            <span className="brand-name">Pranatattva</span>
          </Link>

          <nav className="main-nav" aria-label="Main" ref={navRef}>
            <ul>
              {nav.map((item) =>
                item.children ? (
                  <li key={item.label} onMouseEnter={() => enter(item.label)} onMouseLeave={leave}>
                    <button
                      type="button"
                      className={`nav-link ${isActive(pathname, item.href) ? "is-active" : ""}`}
                      aria-expanded={openMenu === item.label}
                      aria-controls={`dd-${item.label}`}
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    >
                      {item.label}
                      <Chevron />
                    </button>
                    <ul id={`dd-${item.label}`} className={`dropdown ${openMenu === item.label ? "is-open" : ""}`}>
                      <li>
                        <Link href={item.href} className="dd-overview">
                          {item.label} overview
                        </Link>
                      </li>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className={pathname === c.href ? "is-active" : ""}>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`nav-link ${isActive(pathname, item.href) ? "is-active" : ""}`}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="header-actions">
            <Link href="/cart" className="icon-btn" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
              <Bag />
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>
            <Link href="/shop#healings" className="btn btn--sm">
              Book a session
            </Link>
            <button type="button" className="icon-btn menu-toggle" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer-backdrop ${drawer ? "is-open" : ""}`} onClick={() => setDrawer(false)} aria-hidden="true" />
      <aside className={`drawer ${drawer ? "is-open" : ""}`} aria-label="Menu" aria-hidden={!drawer} inert={!drawer ? "" : undefined}>
        <div className="drawer-top">
          <Link href="/" className="brand">
            <LogoMark size={34} />
            <span className="brand-name">Pranatattva</span>
          </Link>
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setDrawer(false)}>
            <Close />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    className="drawer-acc"
                    aria-expanded={openAcc === item.label}
                    onClick={() => setOpenAcc(openAcc === item.label ? null : item.label)}
                  >
                    {item.label}
                    <Chevron />
                  </button>
                  <div className={`drawer-sub ${openAcc === item.label ? "is-open" : ""}`}>
                    <ul>
                      <li><Link href={item.href}>{item.label} overview</Link></li>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className={pathname === c.href ? "is-active" : ""}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link href={item.href} className="drawer-link">{item.label}</Link>
                </li>
              )
            )}
            <li>
              <Link href="/cart" className="drawer-link">
                Cart{count > 0 ? ` (${count})` : ""}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="drawer-foot">
          <Link href="/shop#healings" className="btn btn--block">Book a session</Link>
          <p>{site.address.line1}, {site.address.line2}</p>
          <div className="socials">
            <a href={site.instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsApp /></a>
          </div>
        </div>
      </aside>
    </>
  );
}
