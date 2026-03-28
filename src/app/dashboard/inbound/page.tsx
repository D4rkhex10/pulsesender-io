'use client';

import { useState, useEffect } from 'react';
import { StatCard } from '@/components/stat-card';
import { StatGrid } from '@/components/stat-grid';
import { Panel } from '@/components/panel';

interface InboundLead {
  id: string;
  handle: string;
  platform: string;
  intent: string | null;
  status: string;
  found_at: string;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

export default function InboundPage() {
  const [leads, setLeads] = useState<InboundLead[]>([]);

  useEffect(() => {
    fetch('/api/inbound').then(r => r.ok ? r.json() : null).then(d => { if (d?.leads) setLeads(d.leads); }).catch(() => {});
  }, []);

  const pending = leads.filter(l => l.status === 'pending').length;
  const responded = leads.filter(l => l.status === 'responded').length;
  const noEmail = leads.filter(l => l.status === 'no-email').length;

  return (
    <>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
        Inbound Leads
      </div>

      <StatGrid>
        <StatCard label="Total" value={leads.length} valueClassName="emerald" />
        <StatCard label="Pending" value={pending} valueClassName="gold" />
        <StatCard label="Responded" value={responded} valueClassName="emerald" />
        <StatCard label="No Email" value={noEmail} />
      </StatGrid>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button className="btn-ghost" style={{ borderColor: '#10b981', color: '#10b981' }}>Find Leads</button>
        <button className="btn-ghost" style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>Auto Respond</button>
      </div>

      <Panel title="Intent Signals" subtitle={`${leads.length} leads`}>
        <div className="table-wrap" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '30px' }}>#</th>
                <th>Handle</th>
                <th>Platform</th>
                <th>Intent</th>
                <th>Found</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr><td colSpan={6} className="empty-cell">No inbound leads yet — they&apos;ll appear here from social listening and WhatsApp replies</td></tr>
              ) : (
                leads.map((row, i) => (
                  <tr key={row.id}>
                    <td className="cell-dim">{i + 1}</td>
                    <td className="cell-company">{row.handle}</td>
                    <td className="cell-muted">{row.platform}</td>
                    <td>{row.intent || '—'}</td>
                    <td className="cell-muted">{formatDate(row.found_at)}</td>
                    <td>
                      <span className={
                        row.status === 'responded' ? 'sm-status-sent' :
                        row.status === 'no-email' ? 'cell-dim' :
                        'status-queued'
                      }>
                        {row.status}
                      </span>
                    </td>
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
