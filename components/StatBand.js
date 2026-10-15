const Spark = () => (
  <svg className="spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0l1.6 6.4L16 8l-6.4 1.6L8 16l-1.6-6.4L0 8l6.4-1.6z" fill="currentColor" /></svg>
);

// "Special boxes" for facts and figures
export default function StatBand({ stats, note, overlap = false, label = "Facts and figures" }) {
  return (
    <div>
      <ul className={`stat-band ${overlap ? "" : "stat-band--flat"} ${stats.length === 5 ? "stat-band--5" : ""}`} aria-label={label} style={{ listStyle: "none", paddingLeft: 10 }}>
        {stats.map((s) => (
          <li key={s.label} className="stat-box">
            <Spark />
            <span className="stat-num">{s.value}</span>
            <span className="stat-lbl">{s.label}</span>
            {s.note && <span className="stat-note">{s.note}</span>}
          </li>
        ))}
      </ul>
      {note && <p className="stat-foot">{note}</p>}
    </div>
  );
}
