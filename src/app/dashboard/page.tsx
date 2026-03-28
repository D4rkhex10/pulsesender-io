'use client';

import { useState, useEffect } from 'react';
import { StatCard } from '@/components/stat-card';
import { StatGrid } from '@/components/stat-grid';
import { PipelineControls } from '@/components/pipeline-controls';
import { SendMonitor } from '@/components/send-monitor';
import { EmailOutreach } from '@/components/email-outreach';
import { WhatsAppOutreach } from '@/components/whatsapp-outreach';
import { Terminal } from '@/components/terminal';

function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

export default function OutboundPage() {
  const [stats, setStats] = useState({ sentToday: 0, totalSent: 0, queueCount: 0, waToday: 0, lastWaSend: null as string | null });

  useEffect(() => {
    fetch('/api/dashboard').then(r => r.ok ? r.json() : null).then(d => { if (d) setStats(d); }).catch(() => {});
  }, []);

  return (
    <>
      <StatGrid>
        <StatCard label="Sent Today" value={stats.sentToday} accent sub={`${stats.totalSent} total`} />
        <StatCard label="Follow-ups Today" value={0} sub="0 total" />
        <StatCard label="New in Queue" value={stats.queueCount} />
        <StatCard label="WhatsApp Today" value={stats.waToday} sub={stats.lastWaSend ? `Last run: ${formatDate(stats.lastWaSend)}` : 'No sends yet'} />
      </StatGrid>

      <PipelineControls />
      <SendMonitor />

      <div className="channels-row">
        <EmailOutreach />
        <WhatsAppOutreach />
      </div>

      <div className="panel">
        <div className="panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="panel-title">Pipeline Log</span>
            <span className="running-badge">
              <span className="pulse-dot"></span>live
            </span>
          </div>
          <span className="muted-label">auto-refresh 10s</span>
        </div>
        <Terminal content="[Waiting for pipeline activity...]" height="320px" />
      </div>
    </>
  );
}
