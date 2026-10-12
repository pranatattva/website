export const clean = (v, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
export const isPhone = (v) => /^[0-9+\s-]{10,15}$/.test(v);
export const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v || "");
export const json = (data, status = 200) => Response.json(data, { status });

export function cleanBooking(b = {}) {
  return {
    name: clean(b.name, 120),
    email: clean(b.email, 160).toLowerCase(),
    phone: clean(b.phone, 20),
    preferred_date: isDate(b.preferred_date) ? b.preferred_date : null,
    preferred_time: clean(b.preferred_time, 60),
    mode: clean(b.mode, 60),
    notes: clean(b.notes, 2000),
  };
}

export function bookingError(b) {
  if (!b.name) return "Please enter your name.";
  if (!isEmail(b.email)) return "Please enter a valid email address.";
  if (!isPhone(b.phone)) return "Please enter a valid mobile number.";
  return null;
}
