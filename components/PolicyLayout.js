import Link from "next/link";
import PageHero from "@/components/PageHero";

const LINKS = [
  { label: "Privacy policy", href: "/policies/privacy" },
  { label: "Refund policy", href: "/policies/refund" },
  { label: "Terms and conditions", href: "/policies/terms" },
];

export const POLICY_UPDATED = "12 October 2026";

export default function PolicyLayout({ title, active, children }) {
  return (
    <>
      <PageHero title={title} lede={`Last updated ${POLICY_UPDATED}`} crumbs={[{ label: "Policies" }, { label: title }]} />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap policy-layout">
          <nav className="policy-nav" aria-label="Policies">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={active === l.href ? "is-active" : ""} aria-current={active === l.href ? "page" : undefined}>{l.label}</Link>
            ))}
          </nav>
          <div className="prose">{children}</div>
        </div>
      </section>
    </>
  );
}
