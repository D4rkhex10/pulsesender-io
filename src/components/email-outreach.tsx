'use client';

import { useState, useEffect } from 'react';
import { TemplateBadge } from './badge';

interface SentEmail {
  id: string;
  company: string | null;
  email: string;
  template: string | null;
  sent_at: string | null;
}

function formatDate(d: string | null) {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }) + ', ' + dt.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
}

export function EmailOutreach() {
  const [activeTab, setActiveTab] = useState<'sent' | 'prospects'>('sent');
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/tracking').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.tracking) {
        setSentEmails(d.tracking.map((t: SentEmail & { opens?: number }) => ({
          id: t.id,
          company: t.company,
          email: t.email,
          template: t.template,
          sent_at: t.sent_at,
        })));
      }
    }).catch(() => {});
  }, []);

  const filtered = sentEmails.filter(e =>
    !search || [e.company, e.email].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="panel">
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="panel-title">Email Outreach</span>
          <span className="muted-label">{sentEmails.length} sent</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn-ghost-sm">Templates</button>
          <button className="btn-ghost-sm">Preview</button>
          <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '11px' }}>Send Mails</button>
        </div>
      </div>

      <div className="email-stats-grid">
        <div className="email-stat">
          <span className="stat-label">Total Sent</span>
          <span className="stat-value email-stat-value email-accent">{sentEmails.length}</span>
        </div>
        <div className="email-stat">
          <span className="stat-label">In Queue</span>
          <span className="stat-value email-stat-value">0</span>
        </div>
        <div className="email-stat">
          <span className="stat-label">Followups Due</span>
          <span className="stat-value email-stat-value">0</span>
        </div>
        <div className="email-stat">
          <span className="stat-label">Templates</span>
          <span className="stat-value email-stat-value">0</span>
        </div>
      </div>

      <div className="panel-header tabs-header">
        <div style={{ display: 'flex' }}>
          <button className={`tab ${activeTab === 'sent' ? 'active' : ''}`} onClick={() => setActiveTab('sent')}>
            Sent Log ({sentEmails.length})
          </button>
          <button className={`tab ${activeTab === 'prospects' ? 'active' : ''}`} onClick={() => setActiveTab('prospects')}>
            Prospects (0)
          </button>
        </div>
        <input type="text" className="search-input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {activeTab === 'sent' && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date (WAT)</th>
                <th>Company</th>
                <th className="hide-sm">Email</th>
                <th>Template</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="empty-cell">No emails sent yet</td></tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id}>
                    <td className="cell-muted">{formatDate(row.sent_at)}</td>
                    <td className="cell-company">{row.company || '—'}</td>
                    <td className="cell-muted hide-sm">{row.email}</td>
                    <td>{row.template ? <TemplateBadge type={row.template} /> : <span className="cell-dim">—</span>}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'prospects' && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Email</th>
                <th>Industry</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={4} className="empty-cell">No prospects in queue</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
