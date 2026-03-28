'use client';

import { useState, useEffect, useCallback } from 'react';

interface WaMessage {
  id: string;
  name: string | null;
  company: string | null;
  phone: string;
  industry: string | null;
  message_text: string | null;
  status: string;
  sent_at: string | null;
  delivered_at: string | null;
  created_at: string;
}

// Fallback demo data when API is unavailable
const demoQueue = [
  { id: '1', name: 'Adewale Johnson', company: 'FreshCo', phone: '+234 812 345 6789', industry: 'F&B', message_text: null, status: 'pending', sent_at: null, delivered_at: null, created_at: '' },
  { id: '2', name: 'Chioma Okafor', company: 'GlowUp', phone: '+234 803 987 6543', industry: 'Fashion', message_text: null, status: 'pending', sent_at: null, delivered_at: null, created_at: '' },
  { id: '3', name: 'Tunde Bakare', company: 'HypeHQ', phone: '+234 705 111 2233', industry: 'Events', message_text: null, status: 'ready', sent_at: null, delivered_at: null, created_at: '' },
];

const demoSent = [
  { id: '4', name: 'Bola Ahmed', company: 'TechNest', phone: '+234 901 222 3344', industry: null, message_text: null, status: 'delivered', sent_at: 'Mar 26, 12:15', delivered_at: null, created_at: '' },
  { id: '5', name: 'Kemi Adeola', company: 'MintPay', phone: '+234 811 555 6677', industry: null, message_text: null, status: 'delivered', sent_at: 'Mar 25, 16:40', delivered_at: null, created_at: '' },
];

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }) + ', ' + d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
}

export function WhatsAppOutreach() {
  const [activeTab, setActiveTab] = useState<'queue' | 'sent'>('queue');
  const [queue, setQueue] = useState<WaMessage[]>(demoQueue);
  const [sent, setSent] = useState<WaMessage[]>(demoSent);
  const [sending, setSending] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [isLive, setIsLive] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/whatsapp/messages');
      if (!res.ok) return;
      const data = await res.json();
      const messages: WaMessage[] = data.messages ?? [];

      if (messages.length > 0) {
        setIsLive(true);
        setQueue(messages.filter(m => m.status === 'pending' || m.status === 'ready'));
        setSent(messages.filter(m => m.status !== 'pending' && m.status !== 'ready'));
      }
    } catch {
      // API not available, keep demo data
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function handleSend(msg: WaMessage) {
    setSending(msg.id);
    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: msg.phone,
          name: msg.name,
          company: msg.company,
          industry: msg.industry,
          messageText: msg.message_text || `Hi ${msg.name}, reaching out from PulseSender about a collaboration opportunity.`,
        }),
      });

      if (res.ok) {
        // Move from queue to sent
        setQueue(prev => prev.filter(m => m.id !== msg.id));
        setSent(prev => [{ ...msg, status: 'sent', sent_at: new Date().toISOString() }, ...prev]);
      }
    } catch {
      // Failed silently
    } finally {
      setSending(null);
    }
  }

  const filteredQueue = queue.filter(m =>
    !search || [m.name, m.company, m.phone].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredSent = sent.filter(m =>
    !search || [m.name, m.company, m.phone].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="panel">
      {/* Header */}
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="panel-title">WhatsApp Outreach</span>
          <span className="muted-label">{sent.length} sent{isLive ? '' : ' (demo)'}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn-ghost-sm" onClick={fetchMessages}>Refresh</button>
          <button className="btn-ghost-sm">Verify Numbers</button>
          <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '11px' }}>Auto Send</button>
        </div>
      </div>

      {/* WA Stats */}
      <div className="wa-stats-grid">
        <div className="wa-stat">
          <span className="stat-label">Total</span>
          <span className="stat-value wa-stat-value">{queue.length + sent.length}</span>
        </div>
        <div className="wa-stat">
          <span className="stat-label">Sent</span>
          <span className="stat-value wa-stat-value wa-accent">{sent.length}</span>
        </div>
        <div className="wa-stat">
          <span className="stat-label">Pending</span>
          <span className="stat-value wa-stat-value">{queue.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="panel-header tabs-header">
        <div style={{ display: 'flex' }}>
          <button className={`tab ${activeTab === 'queue' ? 'active' : ''}`} onClick={() => setActiveTab('queue')}>
            Message Queue ({queue.length})
          </button>
          <button className={`tab ${activeTab === 'sent' ? 'active' : ''}`} onClick={() => setActiveTab('sent')}>
            Sent Log ({sent.length})
          </button>
        </div>
        <input type="text" className="search-input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredQueue.map((row) => (
                <tr key={row.id}>
                  <td className="cell-company">{row.name}</td>
                  <td className="cell-muted">{row.company}</td>
                  <td className="cell-muted hide-sm">{row.phone}</td>
                  <td>{row.industry && <span className={`badge badge-${row.industry.toLowerCase().replace(/[&\s]/g, '')}`}>{row.industry}</span>}</td>
                  <td><span className="status-queued">{row.status}</span></td>
                  <td>
                    <button
                      className="btn-ghost-sm"
                      disabled={sending === row.id}
                      onClick={() => handleSend(row)}
                    >
                      {sending === row.id ? 'Sending...' : 'Send'}
                    </button>
                  </td>
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
              {filteredSent.map((row) => (
                <tr key={row.id}>
                  <td className="cell-muted">{formatDate(row.sent_at)}</td>
                  <td className="cell-company">{row.name}</td>
                  <td className="cell-muted">{row.company}</td>
                  <td className="cell-muted hide-sm">{row.phone}</td>
                  <td><span className={`sm-status-${row.status}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
