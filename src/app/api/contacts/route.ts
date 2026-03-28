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
      SELECT id, email, first_name, last_name, company, role, phone, industry, source, status, tags, created_at
      FROM contacts
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 200
    `;

    return NextResponse.json({ contacts: rows });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
