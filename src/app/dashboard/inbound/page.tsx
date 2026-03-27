import { StatCard } from '@/components/stat-card';
import { StatGrid } from '@/components/stat-grid';
import { Panel } from '@/components/panel';

const demoInbound = [
  { handle: '@freshcobrand', platform: 'Instagram', intent: 'Looking for video content', found: 'Mar 26', status: 'pending' },
  { handle: '@glowupng', platform: 'Twitter', intent: 'Needs brand refresh', found: 'Mar 26', status: 'responded' },
  { handle: '@hypehq_events', platform: 'Instagram', intent: 'Event coverage needed', found: 'Mar 25', status: 'pending' },
  { handle: '@technestnig', platform: 'LinkedIn', intent: 'Product launch video', found: 'Mar 25', status: 'pending' },
  { handle: '@mintpayapp', platform: 'Twitter', intent: 'Fintech explainer video', found: 'Mar 24', status: 'responded' },
  { handle: '@boltmedia_', platform: 'Instagram', intent: 'Social media content', found: 'Mar 24', status: 'pending' },
  { handle: '@duneco_events', platform: 'Instagram', intent: 'After-movie production', found: 'Mar 23', status: 'pending' },
  { handle: '@echolabshq', platform: 'LinkedIn', intent: 'Corporate video', found: 'Mar 23', status: 'no-email' },
];

export default function InboundPage() {
  return (
    <>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
        Inbound Leads
      </div>

      <StatGrid>
        <StatCard label="Total" value={8} valueClassName="emerald" />
        <StatCard label="Pending" value={5} valueClassName="gold" />
        <StatCard label="Responded" value={2} valueClassName="emerald" />
        <StatCard label="Manual DM" value={1} />
      </StatGrid>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button className="btn-ghost" style={{ borderColor: '#10b981', color: '#10b981' }}>Find Leads</button>
        <button className="btn-ghost" style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>Auto Respond</button>
      </div>

      <Panel title="Intent Signals" subtitle={`${demoInbound.length} leads`}>
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
              {demoInbound.map((row, i) => (
                <tr key={i}>
                  <td className="cell-dim">{i + 1}</td>
                  <td className="cell-company">{row.handle}</td>
                  <td className="cell-muted">{row.platform}</td>
                  <td>{row.intent}</td>
                  <td className="cell-muted">{row.found}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
