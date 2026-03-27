'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [showPass, setShowPass] = useState(false);
  const [sslEnabled, setSslEnabled] = useState(false);

  return (
    <>
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
