// Works out what kind of Google link was pasted in the admin dashboard
export function googleLink(it) {
  const href = (it?.google_link || "").trim();
  if (!href) return null;
  const u = href.toLowerCase();
  if (u.includes("forms.gle") || u.includes("docs.google.com/forms")) return { href, type: "form", label: "Register" };
  if (u.includes("meet.google.com")) return { href, type: "meet", label: "Join on Google Meet" };
  if (u.includes("maps.app.goo.gl") || u.includes("goo.gl/maps") || u.includes("google.com/maps") || u.includes("maps.google")) return { href, type: "map", label: "View on Google Maps" };
  return { href, type: "link", label: "More details" };
}
