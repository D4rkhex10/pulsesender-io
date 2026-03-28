'use client';

const plans = [
  {
    name: 'Starter',
    price: 120,
    period: '/mo',
    description: 'For solo founders and small teams getting started with outreach.',
    features: [
      '1,000 emails / month',
      '500 WhatsApp messages',
      '1 SMTP account',
      '3 email templates',
      'Basic analytics',
      'CSV / XLSX import',
      'Email support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: 300,
    period: '/mo',
    description: 'For growing teams that need volume and automation.',
    features: [
      '5,000 emails / month',
      '2,000 WhatsApp messages',
      '3 SMTP accounts',
      'Unlimited templates',
      'Advanced analytics',
      'Inbound lead capture',
      'Auto-send sequences',
      'API access',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Scale',
    price: 500,
    period: '/mo',
    description: 'For agencies and teams running outreach at scale.',
    features: [
      '20,000 emails / month',
      '10,000 WhatsApp messages',
      'Unlimited SMTP accounts',
      'Unlimited templates',
      'Full analytics + exports',
      'White-label branding',
      'Multi-user access',
      'Webhook integrations',
      'Custom scraper configs',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function PricingPage() {
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
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card${plan.highlight ? ' pricing-card--highlight' : ''}`}
          >
            {plan.highlight && <div className="pricing-badge">Most Popular</div>}
            <h2 className="pricing-plan-name">{plan.name}</h2>
            <div className="pricing-price">
              <span className="pricing-currency">$</span>
              <span className="pricing-amount">{plan.price}</span>
              <span className="pricing-period">{plan.period}</span>
            </div>
            <p className="pricing-description">{plan.description}</p>

            <button
              className={plan.highlight ? 'btn-primary pricing-cta' : 'btn-ghost pricing-cta'}
            >
              {plan.cta}
            </button>

            <ul className="pricing-features">
              {plan.features.map((feature) => (
                <li key={feature} className="pricing-feature">
                  <span className="pricing-check">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
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
