interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  valueClassName?: string;
}

export function StatCard({ label, value, sub, accent, valueClassName }: StatCardProps) {
  return (
    <div className={`stat-card ${accent ? 'accent' : ''}`}>
      <span className="stat-label">{label}</span>
      <span className={`stat-value ${valueClassName || ''}`}>{value}</span>
      {sub && <span className="stat-sub muted-label">{sub}</span>}
    </div>
  );
}
