interface PanelProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function Panel({ title, subtitle, actions, children, className, bodyClassName }: PanelProps) {
  return (
    <div className={`panel ${className || ''}`}>
      <div className="panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="panel-title">{title}</span>
          {subtitle && <span className="muted-label">{subtitle}</span>}
        </div>
        {actions}
      </div>
      <div className={`panel-body ${bodyClassName || ''}`}>{children}</div>
    </div>
  );
}
