"use client";
import { useState } from "react";

export default function ContactForm({ defaultSubject = "" }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setStatus("busy");
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't send your message.");
      form.reset();
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="form-msg form-msg--ok" role="status">
        Thank you. Your message has been sent and we'll reply within one working day.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <input type="text" name="company" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-grid">
        <div className="field">
          <label htmlFor="c-name">Full name</label>
          <input id="c-name" name="name" className="input" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="c-phone">Mobile number <span className="muted">(optional)</span></label>
          <input id="c-phone" name="phone" type="tel" className="input" autoComplete="tel" inputMode="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" className="input" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="c-subject">Subject</label>
        <input id="c-subject" name="subject" className="input" defaultValue={defaultSubject} />
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="message" className="textarea" required rows={5} />
      </div>
      {error && <p className="form-msg form-msg--err" role="alert">{error}</p>}
      <button type="submit" className="btn" disabled={status === "busy"}>
        {status === "busy" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
