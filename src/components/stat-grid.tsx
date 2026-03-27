export function StatGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`stats-grid ${className || ''}`}>{children}</div>;
}
