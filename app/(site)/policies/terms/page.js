import Link from "next/link";
import PolicyLayout from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata = { title: "Terms and conditions" };

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms and conditions" active="/policies/terms">
      <p>
        These terms apply when you use this website or book, buy or attend anything offered by {site.fullName}. By using the site or our services you agree to them.
      </p>
      <h2>Nature of our services</h2>
      <p>
        Pranic Healing is a complementary energy-based practice. It is not a medical treatment and our healers do not diagnose illness, prescribe medicine or advise you to change any treatment. Always consult a qualified medical professional for any health concern, and never stop or delay medical care because of a healing session. Results vary from person to person and are not guaranteed.
      </p>
      <h2>Bookings</h2>
      <ul>
        <li>The date and time you choose when booking is a preference. We'll confirm the exact slot by phone, WhatsApp or email.</li>
        <li>Please arrive five minutes early for in-person sessions. Late arrival may shorten your session.</li>
        <li>Minors must be accompanied by a parent or guardian, who must also give consent for the session.</li>
      </ul>
      <h2>Classes</h2>
      <ul>
        <li>Course content and materials are for your personal learning and may not be recorded, copied or redistributed.</li>
        <li>We may update dates, venues or instructors if necessary and will tell you as early as possible.</li>
      </ul>
      <h2>Prices and payment</h2>
      <p>
        Prices are shown in Indian rupees and include applicable taxes unless stated otherwise. Payments are processed securely by Razorpay. A booking or order is confirmed only after payment succeeds.
      </p>
      <h2>Products</h2>
      <p>
        Oils and salts are for external use only. Do a patch test before using any oil on your skin, keep products away from children and eyes, and consult a doctor if you are pregnant or have a skin condition. Delivery times are estimates.
      </p>
      <h2>Cancellations and refunds</h2>
      <p>See our <Link href="/policies/refund">refund and cancellation policy</Link>.</p>
      <h2>Intellectual property</h2>
      <p>
        The content, design and logo on this site belong to Pranatattva unless stated otherwise. Pranic Healing and related names are trademarks of their respective owners and are used here to describe the system we practise.
      </p>
      <h2>Liability</h2>
      <p>
        To the extent permitted by law, Pranatattva is not liable for any indirect or consequential loss arising from the use of our services or website. Nothing in these terms limits any rights you have under Indian consumer protection law.
      </p>
      <h2>Privacy</h2>
      <p>How we handle your data is explained in our <Link href="/policies/privacy">privacy policy</Link>.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts in Pune, Maharashtra.</p>
      <h2>Contact</h2>
      <p>Questions? Write to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </PolicyLayout>
  );
}
