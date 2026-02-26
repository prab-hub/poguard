"use client";

import { useState, useEffect } from "react";

// ─── Waitlist Form ────────────────────────────────────────────────────────────
function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [source, setSource] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSource(params.get("src") || "direct");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (res.ok || res.status === 409) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={`text-sm font-medium ${dark ? "text-green-400" : "text-[#16a34a]"}`}>
        You&apos;re on the list. We&apos;ll email you first when we open.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`h-12 w-full rounded-lg border px-4 text-base outline-none focus:ring-2 focus:ring-[#16a34a] sm:w-72 ${
          dark
            ? "border-white/20 bg-white/10 text-white placeholder:text-white/50"
            : "border-[#e5e7eb] bg-white text-[#111827] placeholder:text-[#6b7280]"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="h-12 rounded-lg bg-[#16a34a] px-7 text-base font-bold text-white transition-colors hover:bg-[#15803d] disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Join Waitlist"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong. Try again.</p>
      )}
    </form>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0f1115]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-xl font-bold tracking-tight">
          <span className="text-white">PO</span>
          <span className="text-[#16a34a]">Guard</span>
        </span>
        <a
          href="#waitlist"
          className="rounded-lg bg-[#16a34a] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#15803d]"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="bg-white px-6 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
          For Agency Finance Teams
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-[#111827] md:text-6xl">
          Your client&apos;s PO is expiring.
          <br />
          Your next invoice doesn&apos;t know that yet.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#374151]">
          POGuard alerts you before a PO expires or hits its cap. Before the invoice goes out. Not after it gets rejected.
        </p>
        <div id="waitlist" className="flex flex-col items-center gap-4">
          <WaitlistForm />
          <p className="text-xs text-[#6b7280]">
            Join the waitlist. Free early access for the first 50 agencies.
          </p>
          <p className="text-xs text-[#6b7280]">
            No credit card. No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Pain Section ─────────────────────────────────────────────────────────────
function PainSection() {
  const stats = [
    {
      value: "4–8 weeks",
      label: "Average delay when an invoice is rejected due to a bad PO number",
    },
    {
      value: "$0 in tools",
      label: "What currently exists to track this for agencies on QuickBooks or Xero",
    },
    {
      value: "1 alert",
      label: "All it takes to prevent it entirely",
    },
  ];

  return (
    <section className="bg-[#f9fafb] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
          What Happens Without It
        </p>
        <h2 className="mb-8 text-3xl font-bold text-[#111827] md:text-4xl">
          A $47,000 invoice sat unpaid for 6 weeks. The PO had expired two
          months earlier.
        </h2>
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-xl border border-[#e5e7eb] bg-white p-6"
              style={{ borderLeft: "4px solid #d97706" }}
            >
              <p className="mb-2 text-3xl font-bold text-[#111827]">{s.value}</p>
              <p className="text-sm leading-relaxed text-[#6b7280]">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mb-4 max-w-3xl text-lg leading-relaxed text-[#374151]">
          Their AP system silently rejects invoices for three reasons: expired PO, exceeded cap, wrong PO number. No email. No notification. Just a payment that doesn&apos;t arrive.
        </p>
        <p className="max-w-3xl text-lg leading-relaxed text-[#374151]">
          Three weeks later you chase the client. AP says &quot;wrong PO.&quot; You re-invoice. Another week gone. This happens because POs live in email attachments — not your accounting system.
        </p>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: 1,
      title: "Connect your email + QuickBooks / Xero",
      body: "Connects via OAuth. Read-only invoice data. We never store your credentials.",
    },
    {
      n: 2,
      title: "We detect and read incoming POs",
      body: "Reads incoming POs from email. Extracts PO number, cap, and expiry automatically.",
    },
    {
      n: 3,
      title: "You get two alerts — that's it",
      body: "Alert 1: at 80% cap utilisation. Alert 2: 14 days before expiry. That's it.",
    },
  ];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
          How POGuard Works
        </p>
        <h2 className="mb-12 text-3xl font-bold text-[#111827] md:text-4xl">
          Three steps. No new tools for your clients. No migration.
        </h2>
        <div className="flex flex-col gap-8 md:flex-row">
          {steps.map((s) => (
            <div key={s.n} className="flex-1">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a] text-base font-bold text-white">
                {s.n}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#111827]">{s.title}</h3>
              <p className="text-base leading-relaxed text-[#374151]">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-[#6b7280]">
          No dashboard. No migration. Just two emails that prevent the problem.
        </p>
      </div>
    </section>
  );
}

// ─── Who It's For ─────────────────────────────────────────────────────────────
function WhoItsFor() {
  const yes = [
    "You're a Controller, Finance Director, or CFO at an agency",
    "You bill at least 3–5 enterprise or mid-market clients who issue formal POs",
    "You use QuickBooks Online or Xero",
    "You've had at least one invoice held up because of a PO issue",
  ];
  const notFor = [
    "All your clients pay on credit card or direct debit — no POs",
    "You're on SAP, Oracle, or NetSuite — enterprise ERPs already handle this",
    "You only invoice small clients who don't use formal PO processes",
  ];

  return (
    <section className="bg-[#f9fafb] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
          Built For
        </p>
        <h2 className="mb-12 text-3xl font-bold text-[#111827] md:text-4xl">
          If you invoice enterprise clients, you need this.
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#16a34a]">
              YES — POGuard is for you if:
            </p>
            <ul className="space-y-3">
              {yes.map((item) => (
                <li key={item} className="flex gap-3 text-base text-[#374151]">
                  <span className="mt-0.5 text-[#16a34a]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#6b7280]">
              NOT FOR you if:
            </p>
            <ul className="space-y-3">
              {notFor.map((item) => (
                <li key={item} className="flex gap-3 text-base text-[#374151]">
                  <span className="mt-0.5 text-[#6b7280]">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      title: "PO Detection",
      body: "Reads email attachments and extracts PO number, value cap, and expiry date.",
    },
    {
      title: "80% Cap Alert",
      body: "At 80% PO utilisation, you get an alert — before the next invoice goes out.",
    },
    {
      title: "Expiry Alert",
      body: "14 days before a PO expires, you get an alert to raise a renewal.",
    },
    {
      title: "QuickBooks + Xero Sync",
      body: "OAuth connection. Reads invoice totals per client. No credentials stored.",
    },
    {
      title: "Email-Only Alerts",
      body: "No dashboard. Alerts arrive in your inbox.",
    },
    {
      title: "Nothing Else",
      body: "One thing. Done well. Nothing added.",
    },
  ];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
          What&apos;s Included
        </p>
        <h2 className="mb-12 text-3xl font-bold text-[#111827] md:text-4xl">
          One job. Done perfectly.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[#16a34a]">✓</span>
                <h3 className="font-semibold text-[#111827]">{f.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#374151]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const items = [
    "Unlimited PO tracking",
    "QuickBooks Online + Xero integration",
    "Gmail + Outlook PO detection",
    "80% cap alert + 14-day expiry alert",
    "Email support",
  ];

  return (
    <section className="bg-[#f9fafb] px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
          Pricing
        </p>
        <h2 className="mb-10 text-3xl font-bold text-[#111827] md:text-4xl">
          One plan. One price. No surprises.
        </h2>
        <div className="rounded-2xl border-2 border-[#16a34a] bg-white p-10 shadow-sm">
          <p className="mb-1 text-5xl font-bold text-[#111827]">$25</p>
          <p className="mb-8 text-base text-[#6b7280]">per month</p>
          <ul className="mb-8 space-y-3 text-left">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-3 text-base text-[#374151]">
                <span className="text-[#16a34a]">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mb-6 text-sm text-[#6b7280]">Everything included. Cancel any time.</p>
          <div className="rounded-lg bg-[#f9fafb] p-4 text-sm text-[#374151]">
            One delayed invoice costs more than 2 years of POGuard. The math is obvious.
          </div>
        </div>
        <p className="mt-6 text-sm font-medium text-[#16a34a]">
          Waitlist members get 3 months free when we launch.
        </p>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const faqs = [
    {
      q: "Do you access or store my accounting data?",
      a: "OAuth only — read-only invoice totals. No login credentials ever. Disconnect anytime, data deleted on request.",
    },
    {
      q: "What if the PO comes as a PDF with a non-standard format?",
      a: "OCR extracts the data. If confidence is low, you get a flag to enter details manually. We never guess silently.",
    },
    {
      q: "Does this work if my client sends POs through a portal (not email)?",
      a: "Currently email and attachments only. Ariba and Coupa portals are on the roadmap — tell us your setup when you join.",
    },
    {
      q: "We use Xero, not QuickBooks. Does it work?",
      a: "Yes. QuickBooks Online and Xero both supported. Desktop versions are not.",
    },
    {
      q: "When does it launch?",
      a: "You're early. Waitlist members get first access and 3 months free.",
    },
  ];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
          Common Questions
        </p>
        <h2 className="mb-12 text-3xl font-bold text-[#111827] md:text-4xl">
          FAQ
        </h2>
        <div className="divide-y divide-[#e5e7eb]">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-6">
              <p className="mb-3 font-semibold text-[#111827]">{faq.q}</p>
              <p className="text-base leading-relaxed text-[#374151]">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="bg-[#0f1115] px-6 py-24 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Stop finding out about expired POs three weeks too late.
        </h2>
        <p className="mb-10 text-lg text-white/60">
          Join the waitlist. First 50 agencies get 3 months free.
        </p>
        <div className="flex flex-col items-center gap-4">
          <WaitlistForm dark />
          <p className="text-xs text-white/40">
            No credit card. No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0f1115] border-t border-white/10 px-6 py-10">
      <div className="mx-auto max-w-5xl flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-1 text-lg font-bold">
            <span className="text-white">PO</span>
            <span className="text-[#16a34a]">Guard</span>
          </p>
          <p className="text-sm text-white/50">Never invoice against an expired PO again.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/50 md:text-right">
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
            <a href="mailto:contact@revexos.com" className="hover:text-white/80 transition-colors">
              contact@revexos.com
            </a>
          </div>
          <p>© 2025 POGuard. A product by OTR Automations.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PainSection />
      <HowItWorks />
      <WhoItsFor />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
