'use client';

import { useState } from 'react';
import { IndustryBadge } from '@/components/badge';

const demoScraped = [
  { company: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com', industry: 'Tech', source: 'Instagram', status: 'sent' },
  { company: 'Bolt Media', contact: 'Jane Smith', email: 'jane@bolt.ng', industry: 'Media', source: 'Google Maps', status: 'sent' },
  { company: 'Crux Studio', contact: 'Mike Adewale', email: 'mike@crux.io', industry: 'Events', source: 'Instagram', status: 'queued' },
  { company: 'Dune Events', contact: 'Kola Adeyemi', email: '', industry: 'Events', source: 'Instagram', status: 'no-email' },
  { company: 'Echo Labs', contact: 'Femi Ojo', email: 'femi@echo.dev', industry: 'Tech', source: 'LinkedIn', status: 'queued' },
  { company: 'FreshCo', contact: 'Ade Johnson', email: 'ade@freshco.ng', industry: 'F&B', source: 'Google Maps', status: 'sent' },
  { company: 'GlowUp', contact: 'Chioma Okafor', email: 'chioma@glowup.co', industry: 'Fashion', source: 'Instagram', status: 'queued' },
  { company: 'HypeHQ', contact: 'Tunde Bakare', email: 'tunde@hypehq.io', industry: 'Events', source: 'Twitter', status: 'sent' },
];

const demoImported = [
  { company: 'MintPay', contact: 'Kemi Adeola', email: 'kemi@mintpay.co', industry: 'Fintech', source: 'CSV Import', status: 'queued' },
  { company: 'TechNest', contact: 'Bola Ahmed', email: 'bola@technest.io', industry: 'Tech', source: 'XLSX Import', status: 'sent' },
  { company: 'BiteClub', contact: 'Sade Oni', email: 'sade@biteclub.co', industry: 'F&B', source: 'CSV Import', status: 'queued' },
];

const filters = ['all', 'has-email', 'no-email', 'sent', 'queued'];

export default function ContactsPage() {
  const [tab, setTab] = useState<'scraped' | 'imported'>('scraped');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const data = tab === 'scraped' ? demoScraped : demoImported;

  const filtered = data
    .filter((row) => {
      if (filter === 'has-email') return row.email !== '';
      if (filter === 'no-email') return row.email === '';
      if (filter === 'sent') return row.status === 'sent';
      if (filter === 'queued') return row.status === 'queued';
      return true;
    })
    .filter((row) =>
      search
        ? row.company.toLowerCase().includes(search.toLowerCase()) ||
          row.contact.toLowerCase().includes(search.toLowerCase()) ||
          row.email.toLowerCase().includes(search.toLowerCase())
        : true
    );

  return (
    <>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Scraped</span>
          <span className="stat-value">{demoScraped.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Imported</span>
          <span className="stat-value">{demoImported.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">With Email</span>
          <span className="stat-value emerald">{[...demoScraped, ...demoImported].filter((r) => r.email).length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Sent</span>
          <span className="stat-value">{[...demoScraped, ...demoImported].filter((r) => r.status === 'sent').length}</span>
        </div>
      </div>

      <div className="panel">
        {/* Tabs */}
        <div className="panel-header tabs-header">
          <div style={{ display: 'flex' }}>
            <button className={`tab ${tab === 'scraped' ? 'active' : ''}`} onClick={() => setTab('scraped')}>
              Scraped ({demoScraped.length})
            </button>
            <button className={`tab ${tab === 'imported' ? 'active' : ''}`} onClick={() => setTab('imported')}>
              Imported ({demoImported.length})
            </button>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
          <div className="contacts-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th className="hide-sm">Email</th>
                <th>Industry</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="empty-cell">No contacts match filters</td></tr>
              ) : (
                filtered.map((row, i) => (
                  <tr key={i} className={row.status === 'sent' ? 'row-sent' : ''}>
                    <td className="cell-company">{row.company}</td>
                    <td className="cell-muted">{row.contact}</td>
                    <td className="cell-muted hide-sm">{row.email || '—'}</td>
                    <td><IndustryBadge industry={row.industry} /></td>
                    <td className="cell-dim">{row.source}</td>
                    <td>
                      <span className={row.status === 'sent' ? 'status-sent' : row.status === 'queued' ? 'status-queued' : 'cell-dim'}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
