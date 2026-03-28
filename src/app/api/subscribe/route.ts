import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { authServer } from '@/lib/auth/server';

export async function POST(req: Request) {
  try {
    const { data: session } = await authServer.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tierId } = await req.json();
    if (!tierId) {
      return NextResponse.json({ error: 'tierId is required' }, { status: 400 });
    }

    const sql = getDb();
    const userId = session.user.id;

    // Check if user already has a subscription
    const existing = await sql`SELECT id FROM subscriptions WHERE user_id = ${userId}`;
    if (existing.length > 0) {
      // Update existing
      await sql`
        UPDATE subscriptions
        SET tier_id = ${tierId}, updated_at = now()
        WHERE user_id = ${userId}
      `;
    } else {
      // Create new trial subscription (14 days)
      await sql`
        INSERT INTO subscriptions (user_id, tier_id, status, trial_ends_at, current_period_end)
        VALUES (${userId}, ${tierId}, 'trial', now() + interval '14 days', now() + interval '14 days')
      `;
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
