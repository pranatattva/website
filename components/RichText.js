// Renders simple text formatting written in the admin dashboard:
//   ## Heading, ### Subheading, - list item, > quote, **bold**, blank line = new paragraph.
// Output is built from React elements, so no raw HTML is ever injected.

function inline(text, keyBase) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? <strong key={`${keyBase}-${i}`}>{p.slice(2, -2)}</strong> : p
  );
}

export default function RichText({ text = "" }) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (block.startsWith("### ")) return <h3 key={i}>{inline(block.slice(4), i)}</h3>;
        if (block.startsWith("## ")) return <h2 key={i}>{inline(block.slice(3), i)}</h2>;
        if (lines.every((l) => /^[-*]\s+/.test(l)))
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^[-*]\s+/, ""), `${i}-${j}`)}</li>)}</ul>;
        if (lines.every((l) => /^\d+\.\s+/.test(l)))
          return <ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\.\s+/, ""), `${i}-${j}`)}</li>)}</ol>;
        if (lines.every((l) => l.startsWith(">")))
          return <blockquote key={i}><p>{inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "), i)}</p></blockquote>;
        return <p key={i}>{lines.map((l, j) => <span key={j}>{j > 0 && <br />}{inline(l, `${i}-${j}`)}</span>)}</p>;
      })}
    </div>
  );
}
