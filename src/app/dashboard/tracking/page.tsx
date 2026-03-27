import { TemplateBadge } from '@/components/badge';
import { Panel } from '@/components/panel';

const demoTracking = [
  { company: 'Acme Corp', email: 'hello@acme.com', template: 'direct', sent: 'Mar 26', opens: 3, clicks: 1, lastOpen: 'Mar 27, 09:14' },
  { company: 'Bolt Media', email: 'info@bolt.ng', template: 'proof', sent: 'Mar 26', opens: 2, clicks: 0, lastOpen: 'Mar 26, 18:30' },
  { company: 'Crux Studio', email: 'team@crux.io', template: 'fear', sent: 'Mar 25', opens: 5, clicks: 2, lastOpen: 'Mar 27, 11:02' },
  { company: 'Dune Events', email: 'hi@dune.co', template: 'social', sent: 'Mar 25', opens: 1, clicks: 0, lastOpen: 'Mar 25, 20:45' },
  { company: 'Echo Labs', email: 'hello@echo.dev', template: 'direct', sent: 'Mar 24', opens: 0, clicks: 0, lastOpen: '—' },
  { company: 'FreshCo', email: 'hello@freshco.ng', template: 'proof', sent: 'Mar 24', opens: 4, clicks: 1, lastOpen: 'Mar 26, 15:20' },
  { company: 'GlowUp', email: 'info@glowup.co', template: 'direct', sent: 'Mar 23', opens: 2, clicks: 1, lastOpen: 'Mar 25, 10:00' },
  { company: 'HypeHQ', email: 'team@hypehq.io', template: 'fear', sent: 'Mar 23', opens: 6, clicks: 3, lastOpen: 'Mar 27, 08:55' },
];

export default function TrackingPage() {
  const totalOpens = demoTracking.reduce((s, r) => s + r.opens, 0);
  const totalClicks = demoTracking.reduce((s, r) => s + r.clicks, 0);
  const opened = demoTracking.filter((r) => r.opens > 0).length;

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Emails Tracked</span>
          <span className="stat-value">{demoTracking.length}</span>
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
          <span className="stat-value emerald">{Math.round((opened / demoTracking.length) * 100)}%</span>
        </div>
      </div>

      <Panel title="Email Tracking" subtitle={`${demoTracking.length} tracked emails`}>
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
              {demoTracking.map((row, i) => (
                <tr key={i}>
                  <td className="cell-company">{row.company}</td>
                  <td className="cell-muted hide-sm">{row.email}</td>
                  <td><TemplateBadge type={row.template} /></td>
                  <td className="cell-muted">{row.sent}</td>
                  <td className={row.opens > 0 ? 'emerald' : 'cell-dim'}>{row.opens}</td>
                  <td className={row.clicks > 0 ? 'emerald' : 'cell-dim'}>{row.clicks}</td>
                  <td className="cell-muted hide-sm">{row.lastOpen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
