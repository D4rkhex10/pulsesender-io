'use client';

import { useState } from 'react';
import { IndustryBadge } from '@/components/badge';

const demoLeads = [
  {
    industry: 'Events',
    entries: [
      { company: 'HypeHQ', contact: 'Tunde Bakare', email: 'tunde@hypehq.io' },
      { company: 'Dune Events', contact: 'Kola Adeyemi', email: 'kola@dune.co' },
      { company: 'PulseFest', contact: 'Amara Obi', email: 'amara@pulsefest.ng' },
    ],
  },
  {
    industry: 'Fashion',
    entries: [
      { company: 'GlowUp', contact: 'Chioma Okafor', email: 'chioma@glowup.co' },
      { company: 'ThreadsNG', contact: 'Bisi Alade', email: 'bisi@threads.ng' },
    ],
  },
  {
    industry: 'Tech',
    entries: [
      { company: 'TechNest', contact: 'Bola Ahmed', email: 'bola@technest.io' },
      { company: 'Echo Labs', contact: 'Femi Ojo', email: 'femi@echo.dev' },
      { company: 'CodeCraft', contact: 'Yemi Sola', email: 'yemi@codecraft.ng' },
      { company: 'DataPulse', contact: 'Nkem Eze', email: 'nkem@datapulse.io' },
    ],
  },
  {
    industry: 'F&B',
    entries: [
      { company: 'FreshCo', contact: 'Adewale Johnson', email: 'ade@freshco.ng' },
      { company: 'BiteClub', contact: 'Sade Oni', email: 'sade@biteclub.co' },
    ],
  },
  {
    industry: 'Fintech',
    entries: [
      { company: 'MintPay', contact: 'Kemi Adeola', email: 'kemi@mintpay.co' },
      { company: 'PayStack Clone', contact: 'Ola Babs', email: 'ola@payclone.ng' },
      { company: 'CoinBase NG', contact: 'Temi Gold', email: 'temi@coinbaseng.io' },
    ],
  },
  {
    industry: 'Music',
    entries: [
      { company: 'BeatFactory', contact: 'DJ Flame', email: 'flame@beatfactory.ng' },
      { company: 'SoundWave', contact: 'Asa Green', email: 'asa@soundwave.co' },
    ],
  },
];

const totalLeads = demoLeads.reduce((sum, g) => sum + g.entries.length, 0);

export default function LeadsPage() {
  const [search, setSearch] = useState('');

  const filtered = search
    ? demoLeads
        .map((group) => ({
          ...group,
          entries: group.entries.filter(
            (e) =>
              e.company.toLowerCase().includes(search.toLowerCase()) ||
              e.contact.toLowerCase().includes(search.toLowerCase()) ||
              e.email.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((g) => g.entries.length > 0)
    : demoLeads;

  return (
    <>
      <div className="leads-section-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="panel-title" style={{ fontSize: '13px' }}>All Leads</span>
          <span className="muted-label">{totalLeads} leads</span>
        </div>
        <input
          type="text"
          className="leads-search"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="leads-grid">
        {filtered.map((group) => (
          <div key={group.industry} className="lead-card">
            <div className="lead-card-header">
              <IndustryBadge industry={group.industry} />
              <span className="lead-card-count">{group.entries.length} leads</span>
            </div>
            <div className="table-wrap">
              <table>
                <tbody>
                  {group.entries.map((entry, i) => (
                    <tr key={i}>
                      <td className="cell-company">{entry.company}</td>
                      <td className="cell-muted">{entry.contact}</td>
                      <td className="cell-dim hide-sm">{entry.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
