"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase/browser";
import config from "@/site.config";

export default function LoginPage() {
  const router = useRouter();
  const sb = getBrowserClient();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!sb) return setError("Supabase isn't configured. Add the environment variables in Vercel first.");
    setBusy(true);
    setError("");
    const password = new FormData(e.currentTarget).get("password");
    const { error } = await sb.auth.signInWithPassword({ email: config.adminEmail, password });
    setBusy(false);
    if (error) {
      return setError(
        /confirm/i.test(error.message)
          ? "This email isn't confirmed in Supabase yet. Open the user in Supabase and confirm it."
          : `Wrong password, or ${config.adminEmail} hasn't been added as a user in Supabase yet.`
      );
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="adm-login">
      <form className="form-card form" onSubmit={submit}>
        <div className="center">
          <img src="/brand/pranatattva-logo.png" alt="Pranatattva" width="140" style={{ margin: "0 auto", height: "auto" }} />
          <h1 style={{ fontSize: "1.6rem", margin: "14px 0 4px" }}>Admin dashboard</h1>
          <p className="muted small">Manage classes, events, the gallery, the shop and the blog.</p>
        </div>
        <div className="field">
          <span className="label">Admin email</span>
          <div className="adm-readonly">{config.adminEmail}</div>
          <span className="hint">Set in site.config.js</span>
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="email" name="username" value={config.adminEmail} readOnly autoComplete="username" className="sr-only" tabIndex={-1} aria-hidden="true" />
          <input id="password" name="password" type="password" className="input" required autoComplete="current-password" autoFocus />
        </div>
        {error && <p className="form-msg form-msg--err" role="alert">{error}</p>}
        <button type="submit" className="btn btn--block" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        <a href="/" className="small center muted">Back to the website</a>
      </form>
    </div>
  );
}
