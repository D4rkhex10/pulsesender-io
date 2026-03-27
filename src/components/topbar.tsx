import { getTenant } from '@/lib/tenant';
import { ThemeToggle } from './theme-toggle';

export function Topbar() {
  const t = getTenant();
  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="brand-name">{t.name}</span>
        <span className="topbar-divider">/</span>
        <span className="topbar-sub">{t.tagline}</span>
      </div>
      <div className="topbar-right">
        <ThemeToggle />
        <button className="btn-ghost-sm">refresh</button>
      </div>
    </header>
  );
}
