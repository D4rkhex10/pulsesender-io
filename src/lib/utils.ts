export function escHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function formatDate(ts: string | null): string {
  if (!ts) return '—';
  try {
    return new Date(ts).toLocaleString('en-NG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Lagos',
    });
  } catch {
    return ts;
  }
}

export const BADGE_CLASSES: Record<string, string> = {
  direct: 'badge-direct',
  proof: 'badge-proof',
  fear: 'badge-fear',
  followup: 'badge-followup',
  social: 'badge-social',
};

export const INDUSTRY_BADGE_CLASSES: Record<string, string> = {
  Events: 'badge-events',
  Music: 'badge-music',
  Fashion: 'badge-fashion',
  Hospitality: 'badge-hospitality',
  Tech: 'badge-tech',
  'Real Estate': 'badge-realestate',
  'F&B': 'badge-fnb',
  FMCG: 'badge-fmcg',
  Fintech: 'badge-fintech',
  Healthcare: 'badge-healthcare',
  'E-commerce': 'badge-ecommerce',
  Media: 'badge-media',
  Automotive: 'badge-automotive',
  Education: 'badge-education',
  Legal: 'badge-legal',
  Consulting: 'badge-consulting',
};
