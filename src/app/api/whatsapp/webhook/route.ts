import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const sql = getDb();
    const payload = await req.json();
    const eventType = payload.type as string | undefined;

    // Handle delivery status updates from Kapso
    if (eventType === 'whatsapp.message.delivered') {
      const phone = payload.message?.to ?? payload.contact?.phone;
      if (phone) {
        await sql`
          UPDATE whatsapp_messages
          SET status = 'delivered', delivered_at = now()
          WHERE phone = ${phone} AND status = 'sent'
          ORDER BY created_at DESC
          LIMIT 1
        `;
      }
    }

    if (eventType === 'whatsapp.message.read') {
      const phone = payload.message?.to ?? payload.contact?.phone;
      if (phone) {
        await sql`
          UPDATE whatsapp_messages
          SET status = 'read'
          WHERE phone = ${phone} AND status IN ('sent', 'delivered')
          ORDER BY created_at DESC
          LIMIT 1
        `;
      }
    }

    if (eventType === 'whatsapp.message.failed') {
      const phone = payload.message?.to ?? payload.contact?.phone;
      if (phone) {
        await sql`
          UPDATE whatsapp_messages
          SET status = 'failed'
          WHERE phone = ${phone} AND status IN ('sent', 'pending')
          ORDER BY created_at DESC
          LIMIT 1
        `;
      }
    }

    // Handle inbound messages
    if (eventType === 'whatsapp.message.received') {
      const from = payload.message?.from;
      const text = payload.message?.text?.body ?? '';
      if (from) {
        await sql`
          INSERT INTO inbound_leads (user_id, handle, platform, intent, status)
          VALUES (
            (SELECT id FROM users LIMIT 1),
            ${from},
            'WhatsApp',
            ${text},
            'pending'
          )
        `;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Kapso webhook verification (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const challenge = searchParams.get('hub.challenge');
  if (challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ status: 'ok' });
}
