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
  source: string | null;
  status: string | null;
}

const filters = ['all', 'has-email', 'no-email', 'sent', 'queued'];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/contacts').then(r => r.ok ? r.json() : null).then(d => { if (d?.contacts) setContacts(d.contacts); }).catch(() => {});
  }, []);

  const withEmail = contacts.filter(c => c.email);
  const sentCount = contacts.filter(c => c.status === 'sent').length;

  const filtered = contacts
    .filter((row) => {
      if (filter === 'has-email') return row.email !== '';
      if (filter === 'no-email') return !row.email;
      if (filter === 'sent') return row.status === 'sent';
      if (filter === 'queued') return row.status === 'queued' || row.status === 'active';
      return true;
    })
    .filter((row) =>
      search
        ? [row.company, row.first_name, row.last_name, row.email].some(f => f?.toLowerCase().includes(search.toLowerCase()))
        : true
    );

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <span className="stat-value">{contacts.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">With Email</span>
          <span className="stat-value emerald">{withEmail.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Sent</span>
          <span className="stat-value">{sentCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">In Queue</span>
          <span className="stat-value">{contacts.length - sentCount}</span>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header tabs-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="panel-title">Contacts</span>
            <span className="muted-label">{contacts.length} total</span>
          </div>
          <input type="text" className="search-input" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
          <div className="contacts-filters">
            {filters.map((f) => (
              <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th className="hide-sm">Email</th>
                <th>Industry</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="empty-cell">{contacts.length === 0 ? 'No contacts yet — import a CSV or scrape prospects' : 'No contacts match filters'}</td></tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className={row.status === 'sent' ? 'row-sent' : ''}>
                    <td className="cell-company">{row.company || '—'}</td>
                    <td className="cell-muted">{[row.first_name, row.last_name].filter(Boolean).join(' ') || '—'}</td>
                    <td className="cell-muted hide-sm">{row.email || '—'}</td>
                    <td>{row.industry ? <IndustryBadge industry={row.industry} /> : <span className="cell-dim">—</span>}</td>
                    <td className="cell-dim">{row.source || '—'}</td>
                    <td>
                      <span className={row.status === 'sent' ? 'status-sent' : row.status === 'queued' ? 'status-queued' : 'cell-dim'}>
                        {row.status || 'active'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
