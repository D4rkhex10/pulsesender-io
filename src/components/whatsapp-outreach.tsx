'use client';

import { useState } from 'react';

const demoQueue = [
  { name: 'Adewale Johnson', company: 'FreshCo', phone: '+234 812 345 6789', industry: 'F&B', status: 'pending' },
  { name: 'Chioma Okafor', company: 'GlowUp', phone: '+234 803 987 6543', industry: 'Fashion', status: 'pending' },
  { name: 'Tunde Bakare', company: 'HypeHQ', phone: '+234 705 111 2233', industry: 'Events', status: 'ready' },
];

const demoWaSent = [
  { date: 'Mar 26, 12:15', name: 'Bola Ahmed', company: 'TechNest', phone: '+234 901 222 3344', status: 'delivered' },
  { date: 'Mar 25, 16:40', name: 'Kemi Adeola', company: 'MintPay', phone: '+234 811 555 6677', status: 'delivered' },
];

export function WhatsAppOutreach() {
  const [activeTab, setActiveTab] = useState<'queue' | 'sent'>('queue');

  return (
    <div className="panel">
      {/* Header */}
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="panel-title">WhatsApp Outreach</span>
          <span className="muted-label">2 sent today</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn-ghost-sm">Preview</button>
          <button className="btn-ghost-sm">Verify Numbers</button>
          <button className="btn-ghost-sm">Open Links</button>
          <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '11px' }}>Auto Send</button>
          <button className="btn-ghost-sm">Login Session</button>
        </div>
      </div>

      {/* WA Stats */}
      <div className="wa-stats-grid">
        <div className="wa-stat">
          <span className="stat-label">Total</span>
          <span className="stat-value wa-stat-value">5</span>
        </div>
        <div className="wa-stat">
          <span className="stat-label">Sent</span>
          <span className="stat-value wa-stat-value wa-accent">2</span>
        </div>
        <div className="wa-stat">
          <span className="stat-label">Pending</span>
          <span className="stat-value wa-stat-value">3</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="panel-header tabs-header">
        <div style={{ display: 'flex' }}>
          <button className={`tab ${activeTab === 'queue' ? 'active' : ''}`} onClick={() => setActiveTab('queue')}>
            Message Queue ({demoQueue.length})
          </button>
          <button className={`tab ${activeTab === 'sent' ? 'active' : ''}`} onClick={() => setActiveTab('sent')}>
            Sent Log ({demoWaSent.length})
          </button>
        </div>
        <input type="text" className="search-input" placeholder="Search..." />
      </div>

      {/* Queue */}
      {activeTab === 'queue' && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th className="hide-sm">Phone</th>
                <th>Industry</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {demoQueue.map((row, i) => (
                <tr key={i}>
                  <td className="cell-company">{row.name}</td>
                  <td className="cell-muted">{row.company}</td>
                  <td className="cell-muted hide-sm">{row.phone}</td>
                  <td><span className={`badge badge-${row.industry.toLowerCase().replace(/[&\s]/g, '')}`}>{row.industry}</span></td>
                  <td><span className="status-queued">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sent */}
      {activeTab === 'sent' && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date (WAT)</th>
                <th>Name</th>
                <th>Company</th>
                <th className="hide-sm">Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {demoWaSent.map((row, i) => (
                <tr key={i}>
                  <td className="cell-muted">{row.date}</td>
                  <td className="cell-company">{row.name}</td>
                  <td className="cell-muted">{row.company}</td>
                  <td className="cell-muted hide-sm">{row.phone}</td>
                  <td><span className="sm-status-sent">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
