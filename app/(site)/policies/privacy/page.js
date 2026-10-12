import PolicyLayout from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy policy" active="/policies/privacy">
      <p>
        This policy explains how {site.fullName} ("Pranatattva", "we", "us") collects, uses and protects your personal data when you use {site.url.replace("https://", "")}, book a service, register for a class or buy a product. We process personal data in line with the Digital Personal Data Protection Act, 2023 and other applicable Indian law.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Contact details</strong> such as your name, email address and mobile number.</li>
        <li><strong>Booking details</strong> such as preferred dates and times, and anything you choose to tell us about what you'd like help with.</li>
        <li><strong>Delivery details</strong> such as your postal address when you order products.</li>
        <li><strong>Payment information.</strong> Payments are processed by Razorpay. We receive a payment reference and status, but we never see or store your full card, UPI or bank details.</li>
        <li><strong>Basic technical data</strong> such as browser type and pages visited, used to keep the site secure and working well.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To schedule and deliver healing sessions, classes and events you sign up for.</li>
        <li>To process payments, deliver orders and issue receipts.</li>
        <li>To reply to your messages and send updates about your bookings.</li>
        <li>To send occasional news about classes and events, only if you have agreed. You can opt out at any time.</li>
        <li>To meet legal, tax and accounting obligations.</li>
      </ul>
      <h2>Health information</h2>
      <p>
        If you share details about your health or emotional wellbeing, we use them only to prepare for and provide your session. They are kept confidential, are accessible only to your healer, and are never sold or shared for marketing.
      </p>
      <h2>Who we share it with</h2>
      <p>
        We share data only with service providers who help us run the centre, such as our payment processor (Razorpay), our website and database hosts, and courier partners for deliveries. Each is bound to use your data only to provide their service to us. We may also disclose data where required by law.
      </p>
      <h2>How long we keep it</h2>
      <p>
        We keep booking and order records for as long as needed to provide our services and to meet legal and tax requirements, typically up to eight years for financial records. Messages and enquiries are deleted when no longer needed.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask to access, correct or delete your personal data, or withdraw consent for marketing, by writing to <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond within a reasonable time and in any case within the period required by law.
      </p>
      <h2>Cookies and storage</h2>
      <p>
        We use only essential browser storage, for example to remember the items in your cart and to keep administrators signed in. We do not use advertising cookies on this website.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to <a href={`mailto:${site.email}`}>{site.email}</a> or by post to {site.address.name}, {site.address.line1}, {site.address.line2}.
      </p>
    </PolicyLayout>
  );
}
