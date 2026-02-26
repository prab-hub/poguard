import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const AIRTABLE_BASE = "app3tbe5U3xbraffh";
const AIRTABLE_TABLE = "tblDw2ZFkDQTsEeuQ";
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`;

export async function POST(req: NextRequest) {
  const { email, source = "direct" } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const normalised = email.trim().toLowerCase();
  const token = process.env.AIRTABLE_TOKEN!;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // Check for duplicate
  const search = await fetch(
    `${AIRTABLE_URL}?filterByFormula=${encodeURIComponent(`{Email}="${normalised}"`)}`,
    { headers }
  );
  const existing = await search.json();
  if (existing.records?.length > 0) {
    // Silent pass for duplicates
    return NextResponse.json({ ok: true });
  }

  // Insert new record
  const insert = await fetch(AIRTABLE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      records: [
        {
          fields: {
            Email: normalised,
            Name: source,
            Status: "Waitlist",
          },
        },
      ],
    }),
  });

  if (!insert.ok) {
    const err = await insert.json();
    console.error("Airtable error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // Send confirmation email
  const resend = new Resend(process.env.RESEND_API_KEY!);
  await resend.emails.send({
    from: "POGuard <contact@revexos.com>",
    to: normalised,
    subject: "You're on the POGuard waitlist",
    text: `Hi,

You're on the list.

POGuard alerts you when a client PO is about to expire or hit its cap — before your next invoice goes out.

We're validating demand before building. If enough agencies with this problem join the waitlist, we build it. First 50 get 3 months free.

Quick question while you're here: how often does a PO issue delay one of your invoices? Just reply to this email — it shapes what we build.

Prabhu
OTR Automations
contact@revexos.com`,
  });

  return NextResponse.json({ ok: true });
}
