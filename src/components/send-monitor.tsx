'use client';

export function SendMonitor() {
  // Demo state — shows what the monitor looks like during a send
  const demoItems = [
    { idx: 1, name: 'Acme Corp', email: 'hello@acme.com', template: 'direct', status: 'sent' },
    { idx: 2, name: 'Bolt Media', email: 'info@bolt.ng', template: 'proof', status: 'sent' },
    { idx: 3, name: 'Crux Studio', email: 'team@crux.io', template: 'fear', status: 'sending' },
    { idx: 4, name: 'Dune Events', email: 'hi@dune.co', template: 'social', status: 'waiting' },
    { idx: 5, name: 'Echo Labs', email: 'hello@echo.dev', template: 'direct', status: 'waiting' },
  ];

  return (
    <div className="send-monitor">
      <div className="send-monitor-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="panel-title">Send Monitor</span>
          <span className="running-badge">
            <span className="pulse-dot"></span>sending...
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="muted-label">email · direct</span>
          <button className="btn-ghost-sm">⏸ Pause</button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="send-progress-wrap">
        <div className="send-progress-bar">
          <div className="send-progress-fill" style={{ width: '40%' }}></div>
        </div>
        <span className="muted-label" style={{ fontVariantNumeric: 'tabular-nums', minWidth: '60px', textAlign: 'right' }}>2 / 5</span>
      </div>

      {/* Stats */}
      <div className="send-monitor-stats">
        <div className="sm-stat">
          <span className="sm-stat-num sm-sent">2</span>
          <span className="sm-stat-lbl">Sent</span>
        </div>
        <div className="sm-stat">
          <span className="sm-stat-num sm-failed">0</span>
          <span className="sm-stat-lbl">Failed</span>
        </div>
        <div className="sm-stat">
          <span className="sm-stat-num sm-remaining">3</span>
          <span className="sm-stat-lbl">Remaining</span>
        </div>
        <div className="sm-stat">
          <span className="sm-stat-num">0:24</span>
          <span className="sm-stat-lbl">Elapsed</span>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap" style={{ maxHeight: '320px', overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th style={{ width: '32px' }}>#</th>
              <th>Recipient</th>
              <th className="hide-sm">Email</th>
              <th>Template</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {demoItems.map((item) => (
              <tr key={item.idx} className={item.status === 'sending' ? 'sm-row-active' : ''}>
                <td className="cell-dim">{item.idx}</td>
                <td className="cell-company">{item.name}</td>
                <td className="cell-muted hide-sm">{item.email}</td>
                <td><span className={`badge badge-${item.template}`}>{item.template}</span></td>
                <td><span className={`sm-status-${item.status}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
