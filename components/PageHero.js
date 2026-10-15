import Link from "next/link";
import Decor from "@/components/Decor";

export default function PageHero({ title, lede, crumbs = [], subnav, active, children }) {
  return (
    <section className="page-hero">
      <Decor preset="page" />
      <div className="wrap">
        {crumbs.length > 0 && (
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</li>
            ))}
          </ol>
        )}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {subnav && (
          <nav className="subnav" aria-label="Section">
            {subnav.map((s) => (
              <Link key={s.href} href={s.href} className={active === s.href ? "is-active" : ""} aria-current={active === s.href ? "page" : undefined}>
                {s.label}
              </Link>
            ))}
          </nav>
        )}
        {children}
      </div>
    </section>
  );
}
