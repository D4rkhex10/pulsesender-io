import { BADGE_CLASSES, INDUSTRY_BADGE_CLASSES } from '@/lib/utils';

export function TemplateBadge({ type }: { type: string }) {
  const cls = BADGE_CLASSES[type] || 'badge-unknown';
  return <span className={`badge ${cls}`}>{type || '—'}</span>;
}

export function IndustryBadge({ industry }: { industry: string }) {
  const cls = INDUSTRY_BADGE_CLASSES[industry] || 'badge-unknown';
  return <span className={`badge ${cls}`}>{industry}</span>;
}
