import { NextResponse } from 'next/server';
import { getKapsoClient, getPhoneNumberId } from '@/lib/kapso';
import { getDb } from '@/lib/db';
import { authServer } from '@/lib/auth/server';

export async function POST(req: Request) {
  try {
    const { data: session } = await authServer.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { contactId, phone, name, company, industry, messageText } = await req.json();

    if (!phone || !messageText) {
      return NextResponse.json({ error: 'phone and messageText are required' }, { status: 400 });
    }

    const client = getKapsoClient();
    const phoneNumberId = getPhoneNumberId();

    // Send via Kapso
    const result = await client.messages.sendText({
      phoneNumberId,
      to: phone.replace(/[\s\-()]/g, ''),
      body: messageText,
    });

    // Store in DB
    const sql = getDb();
    const userId = session.user.id;
    const waMessageId = result.messages?.[0]?.id ?? null;

    await sql`
      INSERT INTO whatsapp_messages (user_id, contact_id, name, company, phone, industry, message_text, status, sent_at)
      VALUES (
        ${userId},
        ${contactId || null},
        ${name || null},
        ${company || null},
        ${phone},
        ${industry || null},
        ${messageText},
        'sent',
        now()
      )
    `;

    return NextResponse.json({ success: true, messageId: waMessageId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('WhatsApp send error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
