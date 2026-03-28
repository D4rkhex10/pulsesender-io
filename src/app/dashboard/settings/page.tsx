'use client';

import { useState, useRef, useCallback } from 'react';

export default function SettingsPage() {
  const [showPass, setShowPass] = useState(false);
  const [sslEnabled, setSslEnabled] = useState(false);
  const [mdFileName, setMdFileName] = useState<string | null>(null);
  const [mdContent, setMdContent] = useState<string | null>(null);
  const [mdDragOver, setMdDragOver] = useState(false);
  const mdInputRef = useRef<HTMLInputElement>(null);

  const handleMdFile = useCallback((file: File) => {
    if (!file.name.endsWith('.md')) return;
    setMdFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setMdContent(e.target?.result as string);
    reader.readAsText(file);
  }, []);

  const handleMdDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setMdDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleMdFile(file);
  }, [handleMdFile]);

  return (
    <>
      {/* Brand Configuration */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Brand Configuration</span>
          <span className="muted-label">.md</span>
        </div>
        <div className="panel-body">
          <p className="settings-hint">
            Upload your company&apos;s <code>.md</code> file to tailor the outreach experience — tone, messaging, templates, and targeting will adapt to your brand.
          </p>
          <input
            ref={mdInputRef}
            type="file"
            accept=".md"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleMdFile(file);
            }}
          />
          <div
            className={`csv-drop-zone${mdDragOver ? ' drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setMdDragOver(true); }}
            onDragLeave={() => setMdDragOver(false)}
            onDrop={handleMdDrop}
          >
            {mdContent ? (
              <div className="md-preview">
                <div className="md-preview-header">
                  <span className="md-preview-filename">{mdFileName}</span>
                  <button
                    className="btn-ghost-sm"
                    type="button"
                    onClick={() => { setMdContent(null); setMdFileName(null); }}
                  >
                    remove
                  </button>
                </div>
                <pre className="md-preview-content">{mdContent}</pre>
              </div>
            ) : (
              <>
                <div className="csv-drop-icon">📄</div>
                <div className="csv-drop-label">Drag &amp; drop a .md file here</div>
                <div className="csv-drop-sub">or</div>
                <button className="btn-ghost" type="button" onClick={() => mdInputRef.current?.click()}>
                  Browse File
                </button>
              </>
            )}
          </div>
          {mdContent && (
            <div className="settings-actions">
              <button className="btn-primary">Apply Brand Config</button>
            </div>
          )}
        </div>
      </div>

      {/* SMTP Configuration */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">SMTP Configuration</span>
          <span className="muted-label"></span>
        </div>
        <div className="panel-body">
          <div className="settings-grid">
            <div className="settings-field">
              <label className="settings-label">Outgoing Mail Server (Host)</label>
              <input type="text" className="settings-input" placeholder="mail.privateemail.com" autoComplete="off" spellCheck={false} />
            </div>
            <div className="settings-field settings-field-sm">
              <label className="settings-label">Port</label>
              <input type="number" className="settings-input" placeholder="587" autoComplete="off" />
            </div>
            <div className="settings-field">
              <label className="settings-label">SSL/TLS</label>
              <label className="toggle-label">
                <input type="checkbox" checked={sslEnabled} onChange={() => setSslEnabled(!sslEnabled)} />
                <span className="toggle-track"><span className="toggle-thumb"></span></span>
                <span className="toggle-text">{sslEnabled ? 'On (SSL)' : 'Off (STARTTLS)'}</span>
              </label>
            </div>
            <div className="settings-field">
              <label className="settings-label">Username / Login Email</label>
              <input type="text" className="settings-input" placeholder="hello@yourdomain.com" autoComplete="off" spellCheck={false} />
            </div>
            <div className="settings-field">
              <label className="settings-label">Password</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type={showPass ? 'text' : 'password'} className="settings-input" placeholder="••••••••••••" autoComplete="new-password" />
                <button className="btn-ghost-sm" onClick={() => setShowPass(!showPass)} type="button">
                  {showPass ? 'hide' : 'show'}
                </button>
              </div>
            </div>
            <div className="settings-field">
              <label className="settings-label">From Name</label>
              <input type="text" className="settings-input" placeholder="Your Name" autoComplete="off" spellCheck={false} />
            </div>
            <div className="settings-field">
              <label className="settings-label">From Email Address</label>
              <input type="text" className="settings-input" placeholder="hello@yourdomain.com" autoComplete="off" spellCheck={false} />
            </div>
          </div>
          <div className="settings-actions">
            <button className="btn-primary">Save SMTP Settings</button>
            <button className="btn-ghost">Send Test Email</button>
          </div>
        </div>
      </div>

      {/* CSV Import */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Import Contacts</span>
          <span className="muted-label"></span>
        </div>
        <div className="panel-body">
          <p className="settings-hint">
            Import a CSV to replace the current prospect queue. Required columns: <code>email</code>.
            Optional: <code>name</code>, <code>company</code>, <code>role</code>, <code>industry</code>, <code>template</code>.
          </p>
          <div className="csv-drop-zone">
            <div className="csv-drop-icon">⬆</div>
            <div className="csv-drop-label">Drag &amp; drop a CSV file here</div>
            <div className="csv-drop-sub">or</div>
            <button className="btn-ghost">Browse File</button>
          </div>
        </div>
      </div>

      {/* XLSX Import */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Import Pipeline (XLSX)</span>
          <span className="muted-label"></span>
        </div>
        <div className="panel-body">
          <p className="settings-hint">
            Import a pipeline <code>.xlsx</code> file with Master Pipeline, Personalized Outreach, and Follow-Up Sequence sheets.
            Creates prospect queue + multi-step sequences automatically.
          </p>
          <button className="btn-ghost" style={{ borderColor: '#8C7E52', color: '#8C7E52' }}>
            Browse XLSX File
          </button>
        </div>
      </div>

      {/* WhatsApp (Kapso) Configuration */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">WhatsApp Integration</span>
          <span className="muted-label">Kapso</span>
        </div>
        <div className="panel-body">
          <p className="settings-hint">
            Connect your WhatsApp number via <a href="https://kapso.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Kapso</a>.
            Run <code>npm i -g @kapso/cli && kapso setup</code> to get your API key and phone number ID.
          </p>
          <div className="settings-grid">
            <div className="settings-field">
              <label className="settings-label">Kapso API Key</label>
              <input type="password" className="settings-input" placeholder="kapso_live_..." autoComplete="off" spellCheck={false} />
            </div>
            <div className="settings-field">
              <label className="settings-label">Phone Number ID</label>
              <input type="text" className="settings-input" placeholder="647015955153740" autoComplete="off" spellCheck={false} />
            </div>
            <div className="settings-field">
              <label className="settings-label">Webhook URL</label>
              <input type="text" className="settings-input" readOnly value={typeof window !== 'undefined' ? `${window.location.origin}/api/whatsapp/webhook` : '/api/whatsapp/webhook'} />
            </div>
          </div>
          <div className="settings-actions">
            <button className="btn-primary">Save WhatsApp Config</button>
            <button className="btn-ghost">Send Test Message</button>
          </div>
        </div>
      </div>

      {/* Scraper API Keys */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Web Scraper API Keys</span>
          <span className="muted-label"></span>
        </div>
        <div className="panel-body">
          <p className="settings-hint">
            Used for finding contact emails. Services are tried cheapest-first: direct fetch → ScrapingDog → ScrapingAnt → Scrapestack.
          </p>
          <div className="scraper-services-grid">
            <div className="scraper-service-row">
              <div className="scraper-service-header">
                <span className="scraper-badge scraper-badge--dog">ScrapingDog</span>
                <span className="scraper-service-desc">Budget-friendly · Cheapest per-request</span>
              </div>
              <div className="settings-field">
                <label className="settings-label">API Key</label>
                <input type="text" className="settings-input" placeholder="Your ScrapingDog api_key" autoComplete="off" spellCheck={false} />
              </div>
            </div>

            <div className="scraper-service-row">
              <div className="scraper-service-header">
                <span className="scraper-badge scraper-badge--ant">ScrapingAnt</span>
                <span className="scraper-service-desc">Headless Chrome · JS-heavy SPAs</span>
              </div>
              <div className="settings-field">
                <label className="settings-label">API Key</label>
                <input type="text" className="settings-input" placeholder="Your ScrapingAnt x-api-key" autoComplete="off" spellCheck={false} />
              </div>
            </div>

            <div className="scraper-service-row">
              <div className="scraper-service-header">
                <span className="scraper-badge scraper-badge--stack">Scrapestack</span>
                <span className="scraper-service-desc">100M+ residential proxies · Highest success rate</span>
              </div>
              <div className="settings-field">
                <label className="settings-label">API Key</label>
                <input type="text" className="settings-input" placeholder="Your Scrapestack access_key" autoComplete="off" spellCheck={false} />
              </div>
            </div>
          </div>

          <div className="settings-actions">
            <button className="btn-primary">Save Keys</button>
            <button className="btn-ghost">Test Scraper</button>
          </div>
        </div>
      </div>
    </>
  );
}
