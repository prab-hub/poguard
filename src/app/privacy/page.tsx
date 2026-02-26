import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — POGuard",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#0f1115] px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-white">PO</span>
            <span className="text-[#16a34a]">Guard</span>
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-2 text-3xl font-bold text-[#111827]">Privacy Policy</h1>
        <p className="mb-10 text-sm text-[#6b7280]">Last updated: February 2026</p>

        <div className="space-y-8 text-base leading-relaxed text-[#374151]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Who we are</h2>
            <p>POGuard is a product by OTR Automations. If you have questions about this policy, contact us at <a href="mailto:contact@revexos.com" className="text-[#16a34a] hover:underline">contact@revexos.com</a>.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">What we collect</h2>
            <p>When you join the waitlist, we collect your email address. We also record the source of your visit (e.g. LinkedIn, email) if present in the URL. We collect no other personal data.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">How we use it</h2>
            <p>We use your email address to send you a confirmation that you joined the waitlist, and to notify you when POGuard launches. We do not send marketing emails beyond product updates directly related to POGuard.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Where it's stored</h2>
            <p>Email addresses are stored in Airtable (airtable.com). Confirmation emails are sent via Resend (resend.com). Both services are GDPR-compliant. We do not sell or share your data with any third party beyond these processors.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Your rights</h2>
            <p>You can request deletion of your data at any time by emailing <a href="mailto:contact@revexos.com" className="text-[#16a34a] hover:underline">contact@revexos.com</a>. We will remove your email from our records within 7 days. You can also unsubscribe from any email we send using the unsubscribe link in the footer of that email.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Cookies and analytics</h2>
            <p>This site uses Vercel Analytics and Google Analytics (GA4) to measure page views and traffic sources. These tools may set cookies. No personally identifiable information is passed to either analytics service. You can block analytics by using a browser extension such as uBlock Origin.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Changes to this policy</h2>
            <p>If we make material changes, we will update the date at the top of this page. Continued use of the site after changes constitutes acceptance.</p>
          </section>
        </div>

        <div className="mt-12 border-t border-[#e5e7eb] pt-8">
          <Link href="/" className="text-sm text-[#16a34a] hover:underline">← Back to POGuard</Link>
        </div>
      </main>
    </div>
  );
}
