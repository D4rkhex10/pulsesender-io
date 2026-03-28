'use client';

import { useState, useEffect } from 'react';
import { TemplateBadge } from '@/components/badge';
import { Panel } from '@/components/panel';

interface TrackingRow {
  id: string;
  company: string | null;
  email: string;
  template: string | null;
  sent_at: string | null;
  opens: number;
  clicks: number;
  last_open_at: string | null;
}

function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

function formatDateTime(d: string | null) {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }) + ', ' + dt.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
}

export default function TrackingPage() {
  const [rows, setRows] = useState<TrackingRow[]>([]);

  useEffect(() => {
    fetch('/api/tracking').then(r => r.ok ? r.json() : null).then(d => { if (d?.tracking) setRows(d.tracking); }).catch(() => {});
  }, []);

  const totalOpens = rows.reduce((s, r) => s + r.opens, 0);
  const totalClicks = rows.reduce((s, r) => s + r.clicks, 0);
  const opened = rows.filter((r) => r.opens > 0).length;

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Emails Tracked</span>
          <span className="stat-value">{rows.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Opens</span>
          <span className="stat-value emerald">{totalOpens}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Clicks</span>
          <span className="stat-value">{totalClicks}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Open Rate</span>
          <span className="stat-value emerald">{rows.length > 0 ? Math.round((opened / rows.length) * 100) : 0}%</span>
        </div>
      </div>

      <Panel title="Email Tracking" subtitle={`${rows.length} tracked emails`}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Email</th>
                <th>Template</th>
                <th>Sent</th>
                <th>Opens</th>
                <th>Clicks</th>
                <th className="hide-sm">Last Open</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={7} className="empty-cell">No tracked emails yet — send a campaign to start tracking</td></tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td className="cell-company">{row.company || '—'}</td>
                    <td className="cell-muted hide-sm">{row.email}</td>
                    <td>{row.template ? <TemplateBadge type={row.template} /> : <span className="cell-dim">—</span>}</td>
                    <td className="cell-muted">{formatDate(row.sent_at)}</td>
                    <td className={row.opens > 0 ? 'emerald' : 'cell-dim'}>{row.opens}</td>
                    <td className={row.clicks > 0 ? 'emerald' : 'cell-dim'}>{row.clicks}</td>
                    <td className="cell-muted hide-sm">{formatDateTime(row.last_open_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
