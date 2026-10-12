"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getBrowserClient } from "@/lib/supabase/browser";
import { slugify } from "@/lib/format";

/*
  Generic list + editor for one Supabase table.
  fields:  [{ name, label, type, options, required, help, full, placeholder }]
           type: text | textarea | longtext | number | date | select | checkbox | image | list | slug | url | email
  columns: [{ key, label, render(row) }]
*/
export default function ResourceManager({
  table,
  title,
  singular,
  description,
  fields,
  columns,
  orderBy = { column: "created_at", ascending: false },
  defaults = {},
  allowCreate = true,
  allowDelete = true,
  searchKeys = ["title"],
  toggleKey,
  statusFilter,
}) {
  const sb = getBrowserClient();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState("");
  const dlg = useRef(null);

  const load = useCallback(async () => {
    if (!sb) return;
    setLoading(true);
    const { data, error } = await sb.from(table).select("*").order(orderBy.column, { ascending: orderBy.ascending });
    if (error) setError(error.message);
    else { setRows(data || []); setError(""); }
    setLoading(false);
  }, [sb, table, orderBy.column, orderBy.ascending]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter && status !== "all" && r[statusFilter.key] !== status) return false;
      if (!q) return true;
      return searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(q));
    });
  }, [rows, query, status, searchKeys, statusFilter]);

  function openEditor(row) {
    const base = row ? { ...row } : { ...defaults };
    fields.forEach((f) => {
      if (f.type === "list") base[f.name] = Array.isArray(base[f.name]) ? base[f.name].join("\n") : base[f.name] || "";
      if (base[f.name] === undefined || base[f.name] === null) base[f.name] = f.type === "checkbox" ? false : "";
    });
    setDraft(base);
    setFormError("");
    requestAnimationFrame(() => dlg.current?.showModal());
  }
  const closeEditor = () => dlg.current?.close();

  function payloadFrom(d) {
    const out = {};
    fields.forEach((f) => {
      if (f.readOnly) return;
      let v = d[f.name];
      if (f.type === "number") v = v === "" || v === null ? null : Number(v);
      else if (f.type === "checkbox") v = Boolean(v);
      else if (f.type === "list") v = String(v || "").split("\n").map((s) => s.trim()).filter(Boolean);
      else if (f.type === "date") v = v || null;
      else if (typeof v === "string") v = v.trim();
      if (f.type === "slug" && !v) v = slugify(d.title || d.name || "");
      out[f.name] = v;
    });
    return out;
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    const payload = payloadFrom(draft);
    const missing = fields.find((f) => f.required && (payload[f.name] === "" || payload[f.name] === null || payload[f.name] === undefined));
    if (missing) {
      setFormError(`${missing.label} is required.`);
      setSaving(false);
      return;
    }
    const q = draft.id ? sb.from(table).update(payload).eq("id", draft.id) : sb.from(table).insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) {
      setFormError(error.code === "23505" ? "That slug is already used. Please choose another." : error.message);
      return;
    }
    closeEditor();
    setToast(draft.id ? `${singular} updated` : `${singular} added`);
    load();
  }

  async function remove(row) {
    const name = row.title || row.name || singular.toLowerCase();
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    const { error } = await sb.from(table).delete().eq("id", row.id);
    if (error) return setToast(`Couldn't delete: ${error.message}`);
    setToast(`${singular} deleted`);
    if (draft?.id === row.id) closeEditor();
    load();
  }

  async function toggle(row) {
    const { error } = await sb.from(table).update({ [toggleKey]: !row[toggleKey] }).eq("id", row.id);
    if (error) return setToast(error.message);
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, [toggleKey]: !r[toggleKey] } : r)));
  }

  async function upload(field, file) {
    if (!file) return;
    const path = `${table}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.name.split(".").pop()}`;
    setToast("Uploading image…");
    const { error } = await sb.storage.from("media").upload(path, file, { cacheControl: "31536000", upsert: false });
    if (error) return setToast(`Upload failed: ${error.message}`);
    const { data } = sb.storage.from("media").getPublicUrl(path);
    setDraft((d) => ({ ...d, [field]: data.publicUrl }));
    setToast("Image uploaded");
  }

  const set = (name, value) => setDraft((d) => ({ ...d, [name]: value }));

  return (
    <div>
      <div className="adm-head">
        <div>
          <h1>{title}</h1>
          {description && <p className="muted">{description}</p>}
        </div>
        {allowCreate && <button type="button" className="btn" onClick={() => openEditor(null)}>Add {singular.toLowerCase()}</button>}
      </div>

      <div className="adm-tools">
        <input className="input" type="search" placeholder={`Search ${title.toLowerCase()}`} value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
        {statusFilter && (
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="all">All statuses</option>
            {statusFilter.options.map((o) => <option key={o} value={o}>{o.replace(/_/g, " ")}</option>)}
          </select>
        )}
      </div>

      {error && <p className="form-msg form-msg--err">{error}</p>}
      {loading ? (
        <p className="muted">Loading…</p>
      ) : shown.length === 0 ? (
        <div className="empty">
          <h3>{rows.length ? "No matches" : `No ${title.toLowerCase()} yet`}</h3>
          <p>{rows.length ? "Try a different search or filter." : allowCreate ? `Add your first ${singular.toLowerCase()} to show it on the website.` : "New submissions from the website will appear here."}</p>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                {columns.map((c) => <th key={c.key} scope="col">{c.label}</th>)}
                {toggleKey && <th scope="col">Visible</th>}
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id}>
                  {columns.map((c) => <td key={c.key} data-label={c.label}>{c.render ? c.render(r) : r[c.key] ?? ""}</td>)}
                  {toggleKey && (
                    <td data-label="Visible">
                      <button type="button" className={`switch ${r[toggleKey] ? "is-on" : ""}`} role="switch" aria-checked={!!r[toggleKey]} onClick={() => toggle(r)}>
                        <span className="sr-only">Show on website</span>
                      </button>
                    </td>
                  )}
                  <td className="adm-actions">
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => openEditor(r)}>{allowCreate ? "Edit" : "Open"}</button>
                    {allowDelete && <button type="button" className="adm-del" onClick={() => remove(r)}>Delete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog ref={dlg} className="dialog adm-editor" onClose={() => setDraft(null)} aria-label={`${draft?.id ? "Edit" : "Add"} ${singular}`}>
        {draft && (
          <form onSubmit={save} className="adm-form">
            <div className="dialog-head">
              <h2>{draft.id ? (allowCreate ? `Edit ${singular.toLowerCase()}` : singular) : `Add ${singular.toLowerCase()}`}</h2>
              <button type="button" className="icon-btn" aria-label="Close" onClick={closeEditor}>✕</button>
            </div>
            <div className="dialog-body">
              <div className="adm-fields">
                {fields.map((f) => (
                  <Field key={f.name} f={f} value={draft[f.name]} onChange={(v) => set(f.name, v)} onUpload={(file) => upload(f.name, file)} />
                ))}
              </div>
              {formError && <p className="form-msg form-msg--err" role="alert">{formError}</p>}
            </div>
            <div className="adm-form-foot">
              {draft.id && allowDelete ? <button type="button" className="adm-del" onClick={() => remove(draft)}>Delete</button> : <span />}
              <div className="btn-row">
                <button type="button" className="btn btn--ghost" onClick={closeEditor}>Cancel</button>
                <button type="submit" className="btn" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
              </div>
            </div>
          </form>
        )}
      </dialog>

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function Field({ f, value, onChange, onUpload }) {
  const id = `f-${f.name}`;
  const cls = `field ${f.full || ["textarea", "longtext", "image", "list"].includes(f.type) ? "full" : ""}`;
  if (f.readOnly) {
    return (
      <div className={cls}>
        <span className="label">{f.label}</span>
        <div className="adm-readonly">{f.render ? f.render(value) : String(value || "—")}</div>
      </div>
    );
  }
  if (f.type === "checkbox") {
    return (
      <label className={`check ${cls}`} style={{ alignItems: "center" }}>
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        <span>{f.label}</span>
      </label>
    );
  }
  return (
    <div className={cls}>
      <label htmlFor={id}>{f.label}{f.required && " *"}</label>
      {f.type === "textarea" || f.type === "list" || f.type === "longtext" ? (
        <textarea id={id} className="textarea" rows={f.type === "longtext" ? 16 : 4} value={value} onChange={(e) => onChange(e.target.value)} placeholder={f.placeholder} />
      ) : f.type === "select" ? (
        <select id={id} className="select" value={value} onChange={(e) => onChange(e.target.value)}>
          {!f.required && <option value="">—</option>}
          {f.options.map((o) => {
            const v = typeof o === "string" ? o : o.value;
            const l = typeof o === "string" ? o : o.label;
            return <option key={v} value={v}>{l}</option>;
          })}
        </select>
      ) : f.type === "image" ? (
        <div className="adm-image">
          {value ? <img src={value} alt="" /> : <div className="adm-image-empty">No image</div>}
          <div style={{ display: "grid", gap: 8, flex: 1 }}>
            <input id={id} className="input" type="url" placeholder="Paste an image URL or upload" value={value} onChange={(e) => onChange(e.target.value)} />
            <label className="btn btn--ghost btn--sm" style={{ width: "fit-content" }}>
              Upload image
              <input type="file" accept="image/*" hidden onChange={(e) => onUpload(e.target.files?.[0])} />
            </label>
          </div>
        </div>
      ) : (
        <input
          id={id}
          className="input"
          type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "url" ? "url" : f.type === "email" ? "email" : "text"}
          value={value}
          min={f.type === "number" ? 0 : undefined}
          onChange={(e) => onChange(e.target.value)}
          placeholder={f.placeholder || (f.type === "slug" ? "Leave blank to create from the title" : undefined)}
        />
      )}
      {f.help && <span className="hint">{f.help}</span>}
    </div>
  );
}
