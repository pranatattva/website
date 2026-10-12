import Link from "next/link";
import LogoMark from "@/components/LogoMark";

export default function NotFound() {
  return (
    <main className="section center" style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
      <div className="wrap narrow">
        <LogoMark size={120} animated />
        <h1 style={{ marginTop: 24 }}>This page couldn't be found</h1>
        <p className="lede">The link may be old, or the page may have moved.</p>
        <div className="btn-row"><Link href="/" className="btn">Go to the home page</Link><Link href="/contact" className="btn btn--ghost">Contact us</Link></div>
      </div>
    </main>
  );
}
