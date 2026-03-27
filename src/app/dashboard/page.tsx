import { StatCard } from '@/components/stat-card';
import { StatGrid } from '@/components/stat-grid';
import { PipelineControls } from '@/components/pipeline-controls';
import { SendMonitor } from '@/components/send-monitor';
import { EmailOutreach } from '@/components/email-outreach';
import { WhatsAppOutreach } from '@/components/whatsapp-outreach';
import { Terminal } from '@/components/terminal';

export default function OutboundPage() {
  return (
    <>
      {/* Stats row */}
      <StatGrid>
        <StatCard label="Sent Today" value={12} accent sub="47 total" />
        <StatCard label="Follow-ups Today" value={3} sub="8 total" />
        <StatCard label="New in Queue" value={15} />
        <StatCard label="WhatsApp Today" value={2} sub="Last run: Mar 26" />
      </StatGrid>

      {/* Pipeline controls */}
      <PipelineControls />

      {/* Send Monitor */}
      <SendMonitor />

      {/* Channels row: Email + WhatsApp side by side */}
      <div className="channels-row">
        <EmailOutreach />
        <WhatsAppOutreach />
      </div>

      {/* Pipeline Log */}
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
        <Terminal content="[2026-03-26 14:32:01] Pipeline started...\n[2026-03-26 14:32:02] Loading prospects (15 in queue)...\n[2026-03-26 14:32:03] Sending batch 1/3 (5 emails)...\n[2026-03-26 14:32:15] ✓ 5/5 sent successfully\n[2026-03-26 14:32:16] Sending batch 2/3..." height="320px" />
      </div>
    </>
  );
}
