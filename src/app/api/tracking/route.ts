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

    const rows = await sql`
      SELECT
        cr.id,
        c.company,
        c.email,
        t.name AS template,
        cr.sent_at,
        cr.open_count AS opens,
        cr.click_count AS clicks,
        cr.last_open_at
      FROM campaign_recipients cr
      JOIN contacts c ON cr.contact_id = c.id
      JOIN campaigns camp ON cr.campaign_id = camp.id
      LEFT JOIN templates t ON camp.template_id = t.id
      WHERE camp.user_id = ${userId}
      ORDER BY cr.sent_at DESC
      LIMIT 100
    `;

    return NextResponse.json({ tracking: rows });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
