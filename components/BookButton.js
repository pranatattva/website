"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { formatINR, todayISO } from "@/lib/format";
import { payWithRazorpay } from "@/lib/razorpay-client";
import { Close } from "@/components/Icons";
import LogoMark from "@/components/LogoMark";

const TIMES = ["Morning (10 am – 1 pm)", "Afternoon (2 pm – 5 pm)", "Evening (5 pm – 8 pm)"];

export default function BookButton({ service, label, variant = "" }) {
  const ref = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | busy | done
  const [error, setError] = useState("");
  const free = service.price === 0;
  const isDistance = /distance/i.test(service.name);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      if (status === "done") setStatus("idle");
      setError("");
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [status]);

  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();

  async function submit(e) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const booking = {
      name: f.get("name")?.toString().trim(),
      email: f.get("email")?.toString().trim(),
      phone: f.get("phone")?.toString().trim(),
      preferred_date: f.get("preferred_date"),
      preferred_time: f.get("preferred_time"),
      mode: f.get("mode"),
      notes: f.get("notes")?.toString().trim(),
      company: f.get("company"), // honeypot
    };
    setStatus("busy");
    try {
      if (free) {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serviceId: service.id, booking }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Couldn't send your request.");
      } else {
        await payWithRazorpay({ kind: "service", serviceId: service.id, booking }, { description: service.name });
      }
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  const tomorrow = (() => {
    const d = new Date(todayISO() + "T00:00:00");
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString("en-CA");
  })();

  return (
    <>
      <button type="button" className={`btn btn--sm ${variant}`} onClick={open}>
        {label || (free ? "Book a call" : "Book now")}
      </button>
      <dialog ref={ref} className="dialog" aria-labelledby={`dlg-${service.id}`}>
        <div className="dialog-head">
          <div>
            <h2 id={`dlg-${service.id}`}>{service.name}</h2>
            <p>
              {service.duration}
              {service.duration ? ", " : ""}
              {formatINR(service.price)}
            </p>
          </div>
          <button type="button" className="icon-btn" aria-label="Close" onClick={close}><Close /></button>
        </div>
        <div className="dialog-body">
          {status === "done" ? (
            <div className="success-state" role="status">
              <LogoMark size={88} animated />
              <h3>{free ? "Request received" : "Payment successful, booking confirmed"}</h3>
              <p className="muted">
                We'll call or WhatsApp you within one working day to fix the exact time.
              </p>
              <button type="button" className="btn" onClick={close}>Done</button>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <input type="text" name="company" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="field">
                <label htmlFor={`n-${service.id}`}>Full name</label>
                <input id={`n-${service.id}`} name="name" className="input" required autoComplete="name" />
              </div>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor={`e-${service.id}`}>Email</label>
                  <input id={`e-${service.id}`} name="email" type="email" className="input" required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor={`p-${service.id}`}>Mobile number</label>
                  <input id={`p-${service.id}`} name="phone" type="tel" className="input" required autoComplete="tel" inputMode="tel" pattern="[0-9+\s\-]{10,15}" />
                </div>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor={`d-${service.id}`}>Preferred date</label>
                  <input id={`d-${service.id}`} name="preferred_date" type="date" className="input" min={tomorrow} required />
                </div>
                <div className="field">
                  <label htmlFor={`t-${service.id}`}>Preferred time</label>
                  <select id={`t-${service.id}`} name="preferred_time" className="select" required defaultValue="">
                    <option value="" disabled>Choose a time</option>
                    {TIMES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              {!free && (
                <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend className="label" style={{ marginBottom: 8 }}>How would you like to receive it?</legend>
                  <div className="segmented">
                    <label><input type="radio" name="mode" value="In person at Baner" defaultChecked={!isDistance} /><span>In person at Baner</span></label>
                    <label><input type="radio" name="mode" value="Distance / online" defaultChecked={isDistance} /><span>Distance or online</span></label>
                  </div>
                </fieldset>
              )}
              {free && <input type="hidden" name="mode" value="Phone or video call" />}
              <div className="field">
                <label htmlFor={`x-${service.id}`}>What would you like help with? <span className="muted">(optional)</span></label>
                <textarea id={`x-${service.id}`} name="notes" className="textarea" rows={3} />
              </div>
              <label className="check">
                <input type="checkbox" required />
                <span>
                  I understand Pranic Healing complements medical care and doesn't replace it, and I agree to the{" "}
                  <Link href="/policies/terms" target="_blank">terms</Link> and{" "}
                  <Link href="/policies/refund" target="_blank">refund policy</Link>.
                </span>
              </label>
              {error && <p className="form-msg form-msg--err" role="alert">{error}</p>}
              <button type="submit" className="btn btn--block" disabled={status === "busy"}>
                {status === "busy" ? "Please wait…" : free ? "Request a call" : `Pay ${formatINR(service.price)} and book`}
              </button>
              {!free && <p className="small muted center" style={{ margin: 0 }}>Secure payment by Razorpay. UPI, cards and netbanking accepted.</p>}
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
