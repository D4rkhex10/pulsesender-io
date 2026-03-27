'use client';

import { useState } from 'react';
import { TemplateBadge } from './badge';

const demoSent = [
  { date: 'Mar 26, 14:32', company: 'Acme Corp', email: 'hello@acme.com', template: 'direct' },
  { date: 'Mar 26, 14:28', company: 'Bolt Media', email: 'info@bolt.ng', template: 'proof' },
  { date: 'Mar 26, 14:20', company: 'Crux Studio', email: 'team@crux.io', template: 'fear' },
  { date: 'Mar 25, 18:15', company: 'Dune Events', email: 'hi@dune.co', template: 'social' },
  { date: 'Mar 25, 17:45', company: 'Echo Labs', email: 'hello@echo.dev', template: 'followup' },
];

const demoProspects = [
  { company: 'FreshCo', email: 'hello@freshco.ng', industry: 'F&B', template: 'direct', hook: 'New restaurant opening in Lagos', status: 'queued' },
  { company: 'GlowUp', email: 'info@glowup.co', industry: 'Fashion', template: 'proof', hook: 'Fashion week campaign', status: 'queued' },
  { company: 'HypeHQ', email: 'team@hypehq.io', industry: 'Events', template: 'fear', hook: 'Upcoming tech summit', status: 'sent' },
];

export function EmailOutreach() {
  const [activeTab, setActiveTab] = useState<'sent' | 'prospects'>('sent');

  return (
    <div className="panel">
      {/* Header */}
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="panel-title">Email Outreach</span>
          <span className="muted-label">5 sent today</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn-ghost-sm">✎ Templates</button>
          <button className="btn-ghost-sm">Preview</button>
          <button className="btn-ghost-sm">Test Email</button>
          <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '11px' }}>Send Mails</button>
          <button className="btn-ghost-sm">Followups</button>
        </div>
      </div>

      {/* Email stats */}
      <div className="email-stats-grid">
        <div className="email-stat">
          <span className="stat-label">Total Sent</span>
          <span className="stat-value email-stat-value email-accent">47</span>
        </div>
        <div className="email-stat">
          <span className="stat-label">In Queue</span>
          <span className="stat-value email-stat-value">12</span>
        </div>
        <div className="email-stat">
          <span className="stat-label">Followups Due</span>
          <span className="stat-value email-stat-value">3</span>
        </div>
        <div className="email-stat">
          <span className="stat-label">Templates</span>
          <span className="stat-value email-stat-value">5</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="panel-header tabs-header">
        <div style={{ display: 'flex' }}>
          <button
            className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
            onClick={() => setActiveTab('sent')}
          >
            Sent Log ({demoSent.length})
          </button>
          <button
            className={`tab ${activeTab === 'prospects' ? 'active' : ''}`}
            onClick={() => setActiveTab('prospects')}
          >
            Prospects ({demoProspects.length})
          </button>
        </div>
        <input type="text" className="search-input" placeholder="Search..." />
      </div>

      {/* Sent log */}
      {activeTab === 'sent' && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date (WAT)</th>
                <th>Company</th>
                <th className="hide-sm">Email</th>
                <th>Template</th>
              </tr>
            </thead>
            <tbody>
              {demoSent.map((row, i) => (
                <tr key={i}>
                  <td className="cell-muted">{row.date}</td>
                  <td className="cell-company">{row.company}</td>
                  <td className="cell-muted hide-sm">{row.email}</td>
                  <td><TemplateBadge type={row.template} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Prospects */}
      {activeTab === 'prospects' && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Email</th>
                <th>Industry</th>
                <th>Template</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {demoProspects.map((row, i) => (
                <tr key={i} className={row.status === 'sent' ? 'row-sent' : ''}>
                  <td className="cell-company">{row.company}</td>
                  <td className="cell-muted hide-sm">{row.email}</td>
                  <td><span className={`badge badge-${row.industry.toLowerCase().replace(/[&\s]/g, '')}`}>{row.industry}</span></td>
                  <td><TemplateBadge type={row.template} /></td>
                  <td><span className={`status-${row.status}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
