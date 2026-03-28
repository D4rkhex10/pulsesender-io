'use client';

import { useState, useEffect } from 'react';
import { IndustryBadge } from '@/components/badge';

interface Contact {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  industry: string | null;
}

interface IndustryGroup {
  industry: string;
  entries: Contact[];
}

export default function LeadsPage() {
  const [groups, setGroups] = useState<IndustryGroup[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/contacts').then(r => r.ok ? r.json() : null).then(d => {
      if (!d?.contacts) return;
      const contacts: Contact[] = d.contacts.filter((c: Contact) => c.email);
      setTotalLeads(contacts.length);

      const byIndustry: Record<string, Contact[]> = {};
      for (const c of contacts) {
        const ind = c.industry || 'Other';
        if (!byIndustry[ind]) byIndustry[ind] = [];
        byIndustry[ind].push(c);
      }
      setGroups(Object.entries(byIndustry).map(([industry, entries]) => ({ industry, entries })));
    }).catch(() => {});
  }, []);

  const filtered = search
    ? groups
        .map((group) => ({
          ...group,
          entries: group.entries.filter((e) =>
            [e.company, e.first_name, e.last_name, e.email].some(f => f?.toLowerCase().includes(search.toLowerCase()))
          ),
        }))
        .filter((g) => g.entries.length > 0)
    : groups;

  return (
    <>
      <div className="leads-section-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="panel-title" style={{ fontSize: '13px' }}>All Leads</span>
          <span className="muted-label">{totalLeads} leads</span>
        </div>
        <input type="text" className="leads-search" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <div className="panel" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <span className="cell-dim">{totalLeads === 0 ? 'No leads yet — import contacts to get started' : 'No leads match search'}</span>
        </div>
      ) : (
        <div className="leads-grid">
          {filtered.map((group) => (
            <div key={group.industry} className="lead-card">
              <div className="lead-card-header">
                <IndustryBadge industry={group.industry} />
                <span className="lead-card-count">{group.entries.length} leads</span>
              </div>
              <div className="table-wrap">
                <table>
                  <tbody>
                    {group.entries.map((entry) => (
                      <tr key={entry.id}>
                        <td className="cell-company">{entry.company || '—'}</td>
                        <td className="cell-muted">{[entry.first_name, entry.last_name].filter(Boolean).join(' ') || '—'}</td>
                        <td className="cell-dim hide-sm">{entry.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
