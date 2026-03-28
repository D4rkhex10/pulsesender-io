'use client';

export function SendMonitor() {
  return (
    <div className="send-monitor">
      <div className="send-monitor-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="panel-title">Send Monitor</span>
          <span className="muted-label">idle</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="muted-label">no active send</span>
        </div>
      </div>

      <div className="send-progress-wrap">
        <div className="send-progress-bar">
          <div className="send-progress-fill" style={{ width: '0%' }}></div>
        </div>
        <span className="muted-label" style={{ fontVariantNumeric: 'tabular-nums', minWidth: '60px', textAlign: 'right' }}>0 / 0</span>
      </div>

      <div className="send-monitor-stats">
        <div className="sm-stat">
          <span className="sm-stat-num sm-sent">0</span>
          <span className="sm-stat-lbl">Sent</span>
        </div>
        <div className="sm-stat">
          <span className="sm-stat-num sm-failed">0</span>
          <span className="sm-stat-lbl">Failed</span>
        </div>
        <div className="sm-stat">
          <span className="sm-stat-num sm-remaining">0</span>
          <span className="sm-stat-lbl">Remaining</span>
        </div>
        <div className="sm-stat">
          <span className="sm-stat-num">0:00</span>
          <span className="sm-stat-lbl">Elapsed</span>
        </div>
      </div>

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
            <tr><td colSpan={5} className="empty-cell">No active send — start a campaign to see progress here</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
