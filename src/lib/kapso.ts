import { WhatsAppClient } from '@kapso/whatsapp-cloud-api';

let client: WhatsAppClient | null = null;

export function getKapsoClient() {
  if (!client) {
    const apiKey = process.env.KAPSO_API_KEY;
    if (!apiKey) throw new Error('KAPSO_API_KEY is not set');

    client = new WhatsAppClient({
      baseUrl: 'https://api.kapso.ai/meta/whatsapp',
      kapsoApiKey: apiKey,
    });
  }
  return client;
}

export function getPhoneNumberId() {
  const id = process.env.KAPSO_PHONE_NUMBER_ID;
  if (!id) throw new Error('KAPSO_PHONE_NUMBER_ID is not set');
  return id;
}
