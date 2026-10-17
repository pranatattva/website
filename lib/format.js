const tz = "Asia/Kolkata";

export function formatINR(rupees) {
  if (rupees === null || rupees === undefined || rupees === "") return "";
  if (Number(rupees) === 0) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

function parse(d) {
  if (!d) return null;
  // Date-only strings are treated as local calendar dates
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? new Date(d + "T00:00:00+05:30") : new Date(d);
}

export function formatDate(d, opts = {}) {
  const date = parse(d);
  if (!date) return "";
  return date.toLocaleDateString("en-IN", {
    timeZone: tz,
    day: "numeric",
    month: "long",
    year: "numeric",
    ...opts,
  });
}

export function dateParts(d) {
  const date = parse(d);
  if (!date) return { day: "", month: "", weekday: "" };
  return {
    day: date.toLocaleDateString("en-IN", { timeZone: tz, day: "numeric" }),
    month: date.toLocaleDateString("en-IN", { timeZone: tz, month: "short" }),
    weekday: date.toLocaleDateString("en-IN", { timeZone: tz, weekday: "long" }),
  };
}

export function formatRange(start, end) {
  if (!end || end === start) return formatDate(start);
  const s = parse(start);
  const e = parse(end);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${formatDate(start, { year: undefined, month: undefined })}–${formatDate(end)}`;
  }
  return `${formatDate(start, { year: undefined })} – ${formatDate(end)}`;
}

export function todayISO() {
  return new Date().toLocaleDateString("en-CA", { timeZone: tz });
}

export function slugify(s = "") {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// The price a customer pays: the discounted price when one is set and lower
export function effectivePrice(p) {
  if (p?.price === null || p?.price === undefined) return null;
  if (p.sale_price !== null && p.sale_price !== undefined && p.sale_price !== "" && Number(p.sale_price) < Number(p.price)) return Number(p.sale_price);
  return Number(p.price);
}
