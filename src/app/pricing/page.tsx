'use client';

import { useState, useEffect } from 'react';

interface Tier {
  id: string;
  name: string;
  price_cents: number;
  emails_per_month: number;
  whatsapp_per_month: number;
  smtp_accounts: number;
  templates_limit: number | null;
  features: string[];
}

const tierMeta: Record<string, { description: string; cta: string; highlight: boolean }> = {
  Starter: { description: 'For solo founders and small teams getting started with outreach.', cta: 'Get Started', highlight: false },
  Growth: { description: 'For growing teams that need volume and automation.', cta: 'Start Free Trial', highlight: true },
  Scale: { description: 'For agencies and teams running outreach at scale.', cta: 'Contact Sales', highlight: false },
};

function formatLimit(n: number) {
  if (n >= 999) return 'Unlimited';
  return n.toLocaleString();
}

export default function PricingPage() {
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    fetch('/api/tiers').then(r => r.ok ? r.json() : null).then(d => { if (d?.tiers) setTiers(d.tiers); }).catch(() => {});
  }, []);

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <a href="/" className="pricing-logo">PULSESENDER</a>
        <h1 className="pricing-title">Simple, transparent pricing</h1>
        <p className="pricing-subtitle">
          Start free for 14 days. No credit card required.
        </p>
      </div>

      <div className="pricing-grid">
        {tiers.map((tier) => {
          const meta = tierMeta[tier.name] ?? { description: '', cta: 'Get Started', highlight: false };
          return (
            <div key={tier.id} className={`pricing-card${meta.highlight ? ' pricing-card--highlight' : ''}`}>
              {meta.highlight && <div className="pricing-badge">Most Popular</div>}
              <h2 className="pricing-plan-name">{tier.name}</h2>
              <div className="pricing-price">
                <span className="pricing-currency">$</span>
                <span className="pricing-amount">{tier.price_cents / 100}</span>
                <span className="pricing-period">/mo</span>
              </div>
              <p className="pricing-description">{meta.description}</p>

              <a href={`/auth/sign-up?tier=${tier.id}`} className={meta.highlight ? 'btn-primary pricing-cta' : 'btn-ghost pricing-cta'} style={{ textAlign: 'center', textDecoration: 'none' }}>
                {meta.cta}
              </a>

              <ul className="pricing-features">
                <li className="pricing-feature"><span className="pricing-check">&#10003;</span>{formatLimit(tier.emails_per_month)} emails / month</li>
                <li className="pricing-feature"><span className="pricing-check">&#10003;</span>{formatLimit(tier.whatsapp_per_month)} WhatsApp messages</li>
                <li className="pricing-feature"><span className="pricing-check">&#10003;</span>{formatLimit(tier.smtp_accounts)} SMTP account{tier.smtp_accounts !== 1 ? 's' : ''}</li>
                {tier.templates_limit !== null && (
                  <li className="pricing-feature"><span className="pricing-check">&#10003;</span>{formatLimit(tier.templates_limit)} template{tier.templates_limit !== 1 ? 's' : ''}</li>
                )}
                {(tier.features as string[]).map((feature) => (
                  <li key={feature} className="pricing-feature"><span className="pricing-check">&#10003;</span>{feature}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="pricing-footer">
        <p className="pricing-footer-text">
          All plans include email verification, tracking pixels, and open/click analytics.
        </p>
        <p className="pricing-footer-text">
          Need a custom plan? <a href="mailto:hello@pulsesender.io" className="auth-link">Contact us</a>
        </p>
      </div>
    </div>
  );
}
