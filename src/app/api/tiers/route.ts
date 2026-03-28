import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const tiers = await sql`
      SELECT id, name, price_cents, interval, emails_per_month, whatsapp_per_month, smtp_accounts, templates_limit, features
      FROM tiers
      WHERE is_active = true
      ORDER BY price_cents ASC
    `;
    return NextResponse.json({ tiers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
