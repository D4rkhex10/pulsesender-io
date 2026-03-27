import { TemplateBadge } from '@/components/badge';

const demoCampaigns = [
  { date: 'Mar 26, 2026', sent: 12, opens: 5, rate: '41.7%', templates: ['direct', 'proof'] },
  { date: 'Mar 25, 2026', sent: 18, opens: 7, rate: '38.9%', templates: ['direct', 'fear', 'social'] },
  { date: 'Mar 24, 2026', sent: 8, opens: 4, rate: '50.0%', templates: ['proof'] },
  { date: 'Mar 21, 2026', sent: 15, opens: 6, rate: '40.0%', templates: ['direct', 'followup'] },
  { date: 'Mar 20, 2026', sent: 10, opens: 3, rate: '30.0%', templates: ['fear', 'social'] },
];

export default function AnalyticsPage() {
  return (
    <>
      {/* Campaigns table */}
      <div className="panel" style={{ marginBottom: '14px' }}>
        <div className="panel-header">
          <span className="panel-title">Campaigns</span>
          <span className="muted-label">send batches by date</span>
        </div>
        <div className="campaign-table-wrap">
          <table className="campaign-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Emails Sent</th>
                <th>Opens</th>
                <th>Open Rate</th>
                <th>Templates</th>
              </tr>
            </thead>
            <tbody>
              {demoCampaigns.map((c, i) => (
                <tr key={i}>
                  <td className="cell-muted">{c.date}</td>
                  <td className="cell-company">{c.sent}</td>
                  <td>{c.opens}</td>
                  <td className="emerald">{c.rate}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {c.templates.map((t) => (
                        <TemplateBadge key={t} type={t} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KPI row */}
      <div className="analytics-kpis">
        <div className="analytics-kpi-card">
          <span className="analytics-kpi-label">Brands Analyzed</span>
          <span className="analytics-kpi-value">142</span>
        </div>
        <div className="analytics-kpi-card">
          <span className="analytics-kpi-label">Avg Followers</span>
          <span className="analytics-kpi-value">8.4K</span>
        </div>
        <div className="analytics-kpi-card">
          <span className="analytics-kpi-label">Have Video Content</span>
          <span className="analytics-kpi-value">34%</span>
        </div>
        <div className="analytics-kpi-card">
          <span className="analytics-kpi-label">Run Campaigns</span>
          <span className="analytics-kpi-value">61%</span>
        </div>
      </div>

      {/* Engagement Projections */}
      <div className="analytics-proj-kpis">
        <div className="analytics-proj-header">
          <span className="proj-label-chip">◈ Engagement Projections</span>
          <span className="muted-label">Benchmarks: Instagram 2024 · with professional video content</span>
        </div>
        <div className="analytics-proj-cards">
          <div className="analytics-proj-card">
            <span className="proj-kpi-label">Avg. Engagement Rate Now</span>
            <span className="proj-kpi-value">1.2%</span>
            <span className="proj-kpi-sub">estimated per-post ER</span>
          </div>
          <div className="analytics-proj-card" style={{ borderLeft: '2px solid var(--orange-400)' }}>
            <span className="proj-kpi-label">Avg. ER with Video Content</span>
            <span className="proj-kpi-value proj-value-amber">3.8%</span>
            <span className="proj-kpi-sub">projected with PulseSender</span>
          </div>
          <div className="analytics-proj-card">
            <span className="proj-kpi-label">Total Engaged / Post</span>
            <span className="proj-kpi-value">319</span>
            <span className="proj-kpi-sub">avg likes + comments</span>
          </div>
          <div className="analytics-proj-card">
            <span className="proj-kpi-label">Monthly Leads Potential</span>
            <span className="proj-kpi-value emerald">45</span>
            <span className="proj-kpi-sub">estimated monthly inbound</span>
          </div>
        </div>
      </div>
    </>
  );
}
