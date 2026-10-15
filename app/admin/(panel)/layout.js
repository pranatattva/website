"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoMark from "@/components/LogoMark";
import { getBrowserClient } from "@/lib/supabase/browser";
import config from "@/site.config";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/classes", label: "Classes" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/blog", label: "Blog" },
];

export default function PanelLayout({ children }) {
  const sb = getBrowserClient();
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState(sb ? "checking" : "unconfigured");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!sb) return;
    (async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return router.replace("/admin/login");
      setEmail(user.email);
      if ((user.email || "").toLowerCase() !== String(config.adminEmail).toLowerCase()) return setState("wrong-email");
      let { data: ok } = await sb.rpc("is_admin");
      if (!ok) {
        // First sign-in with the admin email: grant access automatically
        const { data: { session } } = await sb.auth.getSession();
        await fetch("/api/admin/ensure", { method: "POST", headers: { Authorization: `Bearer ${session?.access_token}` } });
        ({ data: ok } = await sb.rpc("is_admin"));
      }
      setState(ok ? "ok" : "forbidden");
    })();
  }, [sb, router]);

  async function signOut() {
    await sb.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  if (state === "unconfigured") {
    return (
      <div className="adm-login">
        <div className="form-card prose">
          <h1 style={{ fontSize: "1.8rem" }}>Connect Supabase to use the dashboard</h1>
          <p>Add <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> to your environment variables, run <code>supabase/schema.sql</code>, then redeploy. The README has step-by-step instructions.</p>
          <a href="/" className="btn">Back to the website</a>
        </div>
      </div>
    );
  }
  if (state === "checking") return <div className="adm-login"><p className="muted">Checking your access…</p></div>;
  if (state === "wrong-email") {
    return (
      <div className="adm-login">
        <div className="form-card prose">
          <h1 style={{ fontSize: "1.8rem" }}>Only the admin email can sign in</h1>
          <p>You're signed in as <strong>{email}</strong>, but the admin email in <code>site.config.js</code> is <strong>{config.adminEmail}</strong>.</p>
          <button type="button" className="btn btn--ghost" onClick={signOut}>Sign out</button>
        </div>
      </div>
    );
  }
  if (state === "forbidden") {
    return (
      <div className="adm-login">
        <div className="form-card prose">
          <h1 style={{ fontSize: "1.8rem" }}>This account isn't an admin yet</h1>
          <p>You're signed in as <strong>{email}</strong>, but access couldn't be granted. Check that <code>SUPABASE_SERVICE_ROLE_KEY</code> is set in Vercel and that <code>schema.sql</code> has been run, then reload this page.</p>
          <button type="button" className="btn btn--ghost" onClick={signOut}>Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="adm">
      <aside className="adm-side">
        <Link href="/admin" className="brand"><LogoMark size={34} /><span className="brand-name">Admin</span></Link>
        <nav aria-label="Admin">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={pathname === n.href ? "is-active" : ""} aria-current={pathname === n.href ? "page" : undefined}>{n.label}</Link>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noopener noreferrer">View website</a>
          <span className="small muted" title={email}>{email}</span>
          <button type="button" className="btn btn--ghost btn--sm" onClick={signOut}>Sign out</button>
        </div>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  );
}
