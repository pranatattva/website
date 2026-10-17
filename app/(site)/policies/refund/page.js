import PolicyLayout from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata = { title: "Refund policy" };

export default function RefundPage() {
  return (
    <PolicyLayout title="Refund and cancellation policy" active="/policies/refund">
      <p>We want booking with us to feel easy and fair. Here is how cancellations, rescheduling and refunds work.</p>
      <h2>Healing sessions</h2>
      <ul>
        <li>You can reschedule a session free of charge if you tell us at least 24 hours before the agreed time.</li>
        <li>Cancellations made at least 24 hours in advance receive a full refund.</li>
        <li>Cancellations within 24 hours, or missed sessions, are not refundable, but we're happy to offer one reschedule as a courtesy.</li>
        <li>If we need to cancel or move a session, you can choose a new time or a full refund.</li>
      </ul>
      <h2>Healing packages</h2>
      <ul>
        <li>Packages are valid for the period stated at purchase.</li>
        <li>Unused sessions can be refunded within the validity period, minus the full single-session price for each session already used.</li>
        <li>Packages are personal and cannot be transferred without our agreement.</li>
      </ul>
      <h2>Courses and workshops</h2>
      <ul>
        <li>Cancellations made 7 or more days before the course start date receive a full refund.</li>
        <li>Cancellations made 2 to 6 days before receive a 50% refund, or the full fee can be moved to a future batch of the same course.</li>
        <li>Cancellations within 48 hours of the start are not refundable, but the fee can be moved to a future batch once.</li>
        <li>If we cancel a course, you'll receive a full refund or a place in the next batch.</li>
      </ul>
      <h2>Products</h2>
      <ul>
        <li>Because oils and salts are consumable, we can't accept returns of opened products.</li>
        <li>If an item arrives damaged, leaking or incorrect, write to us within 7 days of delivery with a photo and we'll replace it or refund it in full.</li>
        <li>Unopened products can be returned within 7 days of delivery. Return shipping is paid by the customer.</li>
      </ul>
      <h2>How refunds are paid</h2>
      <p>
        Approved refunds are made to the original payment method through Razorpay. They are usually processed within 5 to 7 working days, though your bank may take a little longer to show the credit.
      </p>
      <h2>How to request a refund</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> or call {site.phoneDisplay} with your name, booking or order details and the reason for your request.
      </p>
    </PolicyLayout>
  );
}
