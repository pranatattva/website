"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoMark from "@/components/LogoMark";
import { getBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const sb = getBrowserClient();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!sb) return setError("Supabase isn't configured. Add the environment variables first (see README).");
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const { error } = await sb.auth.signInWithPassword({ email: f.get("email"), password: f.get("password") });
    setBusy(false);
    if (error) return setError("That email and password don't match. Please try again.");
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="adm-login">
      <form className="form-card form" onSubmit={submit}>
        <div className="center">
          <LogoMark size={72} />
          <h1 style={{ fontSize: "1.8rem", margin: "14px 0 4px" }}>Pranatattva admin</h1>
          <p className="muted small">Sign in to manage classes, events, the shop and the blog.</p>
        </div>
        <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" className="input" required autoComplete="username" /></div>
        <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" className="input" required autoComplete="current-password" /></div>
        {error && <p className="form-msg form-msg--err" role="alert">{error}</p>}
        <button type="submit" className="btn btn--block" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        <a href="/" className="small center muted">Back to the website</a>
      </form>
    </div>
  );
}
