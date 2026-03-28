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

    const emailStats = await sql`
      SELECT
        COUNT(*) FILTER (WHERE cr.sent_at >= CURRENT_DATE)::int AS sent_today,
        COUNT(*)::int AS total_sent
      FROM campaign_recipients cr
      JOIN campaigns camp ON cr.campaign_id = camp.id
      WHERE camp.user_id = ${userId} AND cr.status != 'pending'
    `;

    const queueStats = await sql`
      SELECT COUNT(*)::int AS queue_count
      FROM contacts
      WHERE user_id = ${userId} AND status IN ('active', 'queued')
    `;

    const waStats = await sql`
      SELECT
        COUNT(*) FILTER (WHERE sent_at >= CURRENT_DATE)::int AS wa_today,
        MAX(sent_at) AS last_wa_send
      FROM whatsapp_messages
      WHERE user_id = ${userId}
    `;

    return NextResponse.json({
      sentToday: emailStats[0]?.sent_today ?? 0,
      totalSent: emailStats[0]?.total_sent ?? 0,
      queueCount: queueStats[0]?.queue_count ?? 0,
      waToday: waStats[0]?.wa_today ?? 0,
      lastWaSend: waStats[0]?.last_wa_send ?? null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
