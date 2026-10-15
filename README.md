# Pranatattva — Pranic Healing website

Next.js 14 (App Router) + Supabase + Razorpay, ready for Vercel.

The site works immediately with built-in sample content. Connect Supabase to manage content from the admin dashboard, and Razorpay to take payments.

## What's inside

| Area | Path |
| --- | --- |
| Home with the animated logo | `app/(site)/page.js`, `components/LogoMark.js` |
| About (Master Choa Kok Sui, Pranic Healing, Pragati, Santosh) | `app/(site)/about/…` |
| Schedule (classes on top, events below, Upcoming / Past tabs) | `app/(site)/schedule/page.js` |
| Shop (healing services on top, products below) | `app/(site)/shop/page.js`, `app/(site)/cart` |
| Blog | `app/(site)/blog/…` |
| Contact (form + map) | `app/(site)/contact` |
| Policies (footer only) | `app/(site)/policies/…` |
| Admin dashboard | `app/admin/…` (at `/admin`) |
| Payment + form APIs | `app/api/…` |
| Database schema and sample data | `supabase/schema.sql`, `supabase/seed.sql` |

## 1. Your details: `site.config.js`

Email, call number, WhatsApp number, Instagram and the admin email all live in **`site.config.js`** (in the main folder). Change them there and the whole site updates.

Other content lives in **`lib/site.js`**:

- `hours` — centre opening hours
- `healers[…]` — Pragati and Santosh's bios, figures, credentials and timeline. To add a photo, upload it to `public/images/` (e.g. `pragati.jpg`) and set `photo: "/images/pragati.jpg"`
- `centreStats` — the four combined figures in the highlight boxes on the Home and About pages
- `testimonials` — add real client quotes and a "What people say" section appears on the home page

Sample prices for services and products live in `lib/sample-data.js` (and in the database once connected, where you edit them from the dashboard).

## 2. Set up Supabase (free tier is fine)

1. Create a project at supabase.com.
2. **SQL Editor → New query**: paste and run `supabase/schema.sql`.
3. Run `supabase/seed.sql` the same way to load the sample classes, events, services, products and blog posts.
4. Run `supabase/gallery.sql` too (only needed if your database was created before the gallery was added; it's already included in `schema.sql`).
5. **Authentication → Users → Add user**: create a user with the SAME email as `adminEmail` in `site.config.js`, set a password, tick "Auto confirm". That user gets admin access automatically on first sign-in.
6. **Project Settings → API**: copy the Project URL, `anon` key and `service_role` key.

## 3. Set up Razorpay

1. Create an account at razorpay.com and complete KYC for live payments.
2. **Account & Settings → API Keys**: generate **test** keys first (`rzp_test_…`).
3. Test with Razorpay's test UPI / cards, then switch to live keys when ready.

## 4. Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
```

## 5. Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repository (framework is detected automatically).
3. Add the environment variables from `.env.example` under **Settings → Environment Variables**.
4. Deploy, then add your domain under **Settings → Domains**.

## Using the admin dashboard

Go to `/admin` and sign in. You can:

- Add, edit, hide or delete **classes** and **events** (past dates disappear from the site automatically)
- See **bookings** and update their status, add private notes
- See paid **orders**, mark them shipped, add tracking numbers
- Read **messages** from the contact form
- Manage **services**, **products** (with photo upload and stock) and **blog posts**

Changes appear on the website within about a minute.

## Notes

- Prices are always recalculated on the server from the database, so they can't be tampered with in the browser.
- Payments are verified with Razorpay's signature before an order is marked paid.
- For extra reliability you can later add a Razorpay webhook (`payment.captured`) that marks orders paid even if the customer closes the window before returning.
- Have the policy pages reviewed by your lawyer or CA before going live.
