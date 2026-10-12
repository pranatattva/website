# Pranatattva — Pranic Healing website

Next.js 14 (App Router) + Supabase + Razorpay, ready for Vercel.

The site works immediately with built-in sample content. Connect Supabase to manage content from the admin dashboard, and Razorpay to take payments.

## What's inside

| Area | Path |
| --- | --- |
| Home with the animated logo | `app/(site)/page.js`, `components/LogoMark.js` |
| About (Master Choa Kok Sui, Pranic Healing, Pragati, Santosh) | `app/(site)/about/…` |
| Schedule (classes, events) | `app/(site)/schedule/…` |
| Shop (services with booking + payment, products with cart) | `app/(site)/shop/…`, `app/(site)/cart` |
| Blog | `app/(site)/blog/…` |
| Contact (form + map) | `app/(site)/contact` |
| Policies (footer only) | `app/(site)/policies/…` |
| Admin dashboard | `app/admin/…` (at `/admin`) |
| Payment + form APIs | `app/api/…` |
| Database schema and sample data | `supabase/schema.sql`, `supabase/seed.sql` |

## 1. Edit the placeholders

Open **`lib/site.js`** and replace:

- `phoneDisplay`, `phoneHref`, `whatsappHref` — the real mobile number
- `instagramHref`, `instagramHandle` — the real Instagram profile
- `hours` — centre opening hours
- `healers[…]` — Pragati and Santosh's real bios, focus areas, figures and (optionally) a `photo` URL

Sample prices for services and products live in `lib/sample-data.js` (and in the database once connected, where you edit them from the dashboard).

## 2. Set up Supabase (free tier is fine)

1. Create a project at supabase.com.
2. **SQL Editor → New query**: paste and run `supabase/schema.sql`.
3. Run `supabase/seed.sql` the same way to load the sample classes, events, services, products and blog posts.
4. **Authentication → Users → Add user**: create your admin login (email + password, tick "Auto confirm").
5. Back in the SQL Editor, give that user admin rights:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'info@pranatattva.com';
   ```
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
