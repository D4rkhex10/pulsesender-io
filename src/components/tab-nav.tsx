'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Outbound',  icon: '↗', href: '/dashboard' },
  { label: 'Inbound',   icon: '↙', href: '/dashboard/inbound' },
  { label: 'Leads',     icon: '◎', href: '/dashboard/leads' },
  { label: 'Analytics',  icon: '◈', href: '/dashboard/analytics' },
  { label: 'Tracking',  icon: '◉', href: '/dashboard/tracking' },
  { label: 'Contacts',  icon: '◧', href: '/dashboard/contacts' },
  { label: 'Settings',  icon: '⚙', href: '/dashboard/settings' },
];

export function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="lead-type-bar">
      {tabs.map((tab) => {
        const isActive =
          tab.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`lead-type-tab ${isActive ? 'active' : ''}`}
          >
            <span className="lt-icon">{tab.icon}</span> {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
