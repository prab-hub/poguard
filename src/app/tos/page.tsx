import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — POGuard",
};

export default function TermsOfService() {
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
        <h1 className="mb-2 text-3xl font-bold text-[#111827]">Terms of Service</h1>
        <p className="mb-10 text-sm text-[#6b7280]">Last updated: February 2026</p>

        <div className="space-y-8 text-base leading-relaxed text-[#374151]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">About this site</h2>
            <p>This website is operated by OTR Automations. POGuard is currently in pre-launch. This site exists to gauge demand before the product is built. By joining the waitlist you are expressing interest — not purchasing or subscribing to anything.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">No product yet</h2>
            <p>POGuard does not currently exist as a working product. Pricing, features, and timelines shown on this page are indicative and subject to change. Joining the waitlist creates no obligation on either side.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Acceptable use</h2>
            <p>You may not use this site to submit false, misleading, or third-party email addresses. You may not attempt to disrupt, scrape, or abuse the site or its infrastructure.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Intellectual property</h2>
            <p>All content on this site — copy, design, and code — is owned by OTR Automations. You may not reproduce or reuse it without written permission.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Limitation of liability</h2>
            <p>This site is provided as-is. OTR Automations makes no warranties, express or implied. We are not liable for any loss or damage arising from your use of this site or reliance on information contained within it.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Governing law</h2>
            <p>These terms are governed by the laws of the jurisdiction in which OTR Automations is registered. Any disputes shall be resolved in the courts of that jurisdiction.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:contact@revexos.com" className="text-[#16a34a] hover:underline">contact@revexos.com</a>.</p>
          </section>
        </div>

        <div className="mt-12 border-t border-[#e5e7eb] pt-8">
          <Link href="/" className="text-sm text-[#16a34a] hover:underline">← Back to POGuard</Link>
        </div>
      </main>
    </div>
  );
}
