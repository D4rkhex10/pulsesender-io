'use client';

import { useState, useEffect } from 'react';

interface Campaign {
  id: string;
  name: string;
  status: string;
  total_count: number;
  sent_count: number;
  open_count: number;
  click_count: number;
  bounce_count: number;
  created_at: string;
}

interface Stats {
  total_contacts: number;
  sent_contacts: number;
  industries: number;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AnalyticsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState<Stats>({ total_contacts: 0, sent_contacts: 0, industries: 0 });

  useEffect(() => {
    fetch('/api/analytics').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.campaigns) setCampaigns(d.campaigns);
      if (d?.stats) setStats(d.stats);
    }).catch(() => {});
  }, []);

  const totalSent = campaigns.reduce((s, c) => s + c.sent_count, 0);
  const totalOpens = campaigns.reduce((s, c) => s + c.open_count, 0);

  return (
    <>
      <div className="panel" style={{ marginBottom: '14px' }}>
        <div className="panel-header">
          <span className="panel-title">Campaigns</span>
          <span className="muted-label">{campaigns.length} campaigns</span>
        </div>
        <div className="campaign-table-wrap">
          <table className="campaign-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Sent</th>
                <th>Opens</th>
                <th>Open Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr><td colSpan={6} className="empty-cell">No campaigns yet — create and send your first campaign</td></tr>
              ) : (
                campaigns.map((c) => (
                  <tr key={c.id}>
                    <td className="cell-muted">{formatDate(c.created_at)}</td>
                    <td className="cell-company">{c.name}</td>
                    <td>{c.sent_count}</td>
                    <td>{c.open_count}</td>
                    <td className="emerald">{c.sent_count > 0 ? Math.round((c.open_count / c.sent_count) * 100) : 0}%</td>
                    <td><span className={`status-${c.status === 'completed' ? 'sent' : 'queued'}`}>{c.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="analytics-kpis">
        <div className="analytics-kpi-card">
          <span className="analytics-kpi-label">Total Contacts</span>
          <span className="analytics-kpi-value">{stats.total_contacts}</span>
        </div>
        <div className="analytics-kpi-card">
          <span className="analytics-kpi-label">Emails Sent</span>
          <span className="analytics-kpi-value">{totalSent}</span>
        </div>
        <div className="analytics-kpi-card">
          <span className="analytics-kpi-label">Total Opens</span>
          <span className="analytics-kpi-value">{totalOpens}</span>
        </div>
        <div className="analytics-kpi-card">
          <span className="analytics-kpi-label">Industries</span>
          <span className="analytics-kpi-value">{stats.industries}</span>
        </div>
      </div>
    </>
  );
}
