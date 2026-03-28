import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { authServer } from '@/lib/auth/server';

export async function GET() {
  try {
    const { data: session } = await authServer.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = getDb();
    const userId = session.user.id;

    const campaigns = await sql`
      SELECT
        id, name, status,
        total_count, sent_count, open_count, click_count, bounce_count, failed_count,
        started_at, completed_at, created_at
      FROM campaigns
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 50
    `;

    const stats = await sql`
      SELECT
        COUNT(*)::int AS total_contacts,
        COUNT(*) FILTER (WHERE status = 'sent')::int AS sent_contacts,
        COUNT(DISTINCT industry) FILTER (WHERE industry IS NOT NULL)::int AS industries
      FROM contacts
      WHERE user_id = ${userId}
    `;

    return NextResponse.json({ campaigns, stats: stats[0] ?? {} });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
