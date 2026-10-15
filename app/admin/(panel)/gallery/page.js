"use client";
import { useState } from "react";
import ResourceManager from "@/components/admin/ResourceManager";
import { getBrowserClient } from "@/lib/supabase/browser";
import { compressImage } from "@/lib/compress-image";
import { formatDate } from "@/lib/format";

function BulkUpload({ onDone }) {
  const sb = getBrowserClient();
  const [album, setAlbum] = useState("");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function handle(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    setError("");
    let done = 0;
    for (const original of files) {
      setBusy(`Uploading ${done + 1} of ${files.length}…`);
      const file = await compressImage(original);
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${file.name.split(".").pop()}`;
      const up = await sb.storage.from("media").upload(path, file, { cacheControl: "31536000" });
      if (up.error) { setError(`Couldn't upload ${original.name}: ${up.error.message}`); continue; }
      const { data } = sb.storage.from("media").getPublicUrl(path);
      const ins = await sb.from("gallery").insert({ image_url: data.publicUrl, album: album.trim() || null, is_published: true });
      if (ins.error) { setError(ins.error.message.includes("gallery") ? "The gallery table doesn't exist yet. Run supabase/gallery.sql in Supabase first." : ins.error.message); break; }
      done++;
    }
    setBusy(done ? `${done} photo${done > 1 ? "s" : ""} added` : "");
    onDone();
    setTimeout(() => setBusy(""), 3000);
  }

  return (
    <div className="bulk card">
      <div>
        <h2 style={{ fontSize: "1.3rem", margin: 0 }}>Add photos</h2>
        <p className="muted small" style={{ margin: "4px 0 0" }}>Choose one or many photos at once. They're resized automatically and appear on the website within a minute. Add captions afterwards with Edit.</p>
      </div>
      <div className="bulk-row">
        <div className="field">
          <label htmlFor="album">Album (optional)</label>
          <input id="album" className="input" placeholder="e.g. Healing camps, Classes, Full moon meditation" value={album} onChange={(e) => setAlbum(e.target.value)} />
        </div>
        <label className="btn" style={{ cursor: busy ? "wait" : "pointer" }}>
          {busy || "Choose photos"}
          <input type="file" accept="image/*" multiple hidden onChange={handle} disabled={!!busy && busy.startsWith("Uploading")} />
        </label>
      </div>
      {error && <p className="form-msg form-msg--err">{error}</p>}
    </div>
  );
}

export default function Page() {
  const [key, setKey] = useState(0);
  return (
    <>
      <BulkUpload onDone={() => setKey((k) => k + 1)} />
      <ResourceManager
        refreshKey={key}
        table="gallery"
        title="Gallery"
        singular="Photo"
        description="Photos shown on the Gallery page and the home page. Lower display order shows first."
        orderBy={{ column: "created_at", ascending: false }}
        searchKeys={["caption", "album"]}
        toggleKey="is_published"
        allowCreate={true}
        defaults={{ is_published: true, sort_order: 0 }}
        columns={[
          { key: "image_url", label: "Photo", render: (r) => <img className="adm-thumb" src={r.image_url} alt="" /> },
          { key: "caption", label: "Caption", render: (r) => r.caption || <span className="muted">No caption</span> },
          { key: "album", label: "Album" },
          { key: "taken_on", label: "Date", render: (r) => formatDate(r.taken_on) },
        ]}
        fields={[
          { name: "image_url", label: "Photo", type: "image", required: true },
          { name: "caption", label: "Caption", type: "text", full: true, placeholder: "e.g. Free healing camp, Baner" },
          { name: "album", label: "Album", type: "text", placeholder: "Healing camps" },
          { name: "taken_on", label: "Date taken", type: "date" },
          { name: "sort_order", label: "Display order", type: "number", help: "Lower numbers show first. Leave 0 for newest first." },
          { name: "is_published", label: "Show on website", type: "checkbox" },
        ]}
      />
    </>
  );
}
