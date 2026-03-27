'use client';

import { Panel } from './panel';

export function PipelineControls() {
  return (
    <Panel title="Pipeline Controls" bodyClassName="pipeline-body">
      {/* Actions */}
      <div className="pipeline-section">
        <span className="pipeline-section-label">Actions</span>
        <div className="pipeline-buttons">
          <button className="btn-primary">Send Mails</button>
          <button className="btn-ghost">Preview Send</button>
          <button className="btn-ghost">Test Email</button>
          <button className="btn-primary">Run Followups</button>
          <button className="btn-primary">Run Full Pipeline</button>
        </div>
        <div className="batch-controls">
          <span className="batch-label">Batch</span>
          <input type="number" className="batch-input" placeholder="all" />
          <span className="batch-label">Offset</span>
          <input type="number" className="batch-input" placeholder="0" />
          <span className="muted-label">applies to Send Mails &amp; WhatsApp</span>
        </div>
      </div>

      {/* Find Prospects */}
      <div className="pipeline-section">
        <span className="pipeline-section-label">Find Prospects</span>
        <div className="pipeline-buttons">
          <button className="btn-ghost">Discover &amp; Research</button>
          <button className="btn-ghost">Social Listen</button>
          <button className="btn-ghost">Curate Places</button>
        </div>
      </div>

      {/* Prepare & Send */}
      <div className="pipeline-section">
        <span className="pipeline-section-label">Prepare &amp; Send</span>
        <div className="pipeline-buttons">
          <button className="btn-ghost">Find Emails</button>
          <button className="btn-ghost">Research Imports</button>
          <button className="btn-ghost">Build Prospects</button>
          <button className="btn-ghost">Dry Run</button>
        </div>
      </div>

      {/* Queue Health */}
      <div className="pipeline-section">
        <span className="pipeline-section-label">Queue Health</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn-ghost">Verify Emails</button>
          <button className="btn-ghost" disabled>Remove Invalid</button>
          <span className="muted-label"></span>
        </div>
      </div>
    </Panel>
  );
}
