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
      SELECT id, name, company, phone, industry, message_text, status, sent_at, delivered_at, created_at
      FROM whatsapp_messages
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 50
    `;

    return NextResponse.json({ messages: rows });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('WhatsApp messages fetch error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
