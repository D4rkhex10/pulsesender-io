export const tenant = {
  name: 'PulseSender',
  tagline: 'Outreach',
  domain: 'pulsesender.io',
  logo: '/logo.svg',
  fonts: {
    display: 'Antonio',
    mono: "'Menlo', 'Monaco', 'Consolas', monospace",
  },
  colors: {
    primary: '#F7F7F7',
    accent: '#10b981',
    dark: {
      bg: '#0B0B0B',
      text: '#F7F7F7',
      border: 'rgba(255, 255, 255, 0.10)',
      borderFaint: 'rgba(255, 255, 255, 0.05)',
      muted: '#71717a',
    },
    light: {
      bg: '#FAFAFA',
      text: '#18181B',
      border: 'rgba(0, 0, 0, 0.10)',
      borderFaint: 'rgba(0, 0, 0, 0.05)',
      muted: '#71717a',
    },
  },
  meta: {
    title: 'PulseSender — Outreach Dashboard',
    description: 'Multi-channel outreach dashboard for email and WhatsApp campaigns.',
  },
} as const;

export type TenantConfig = typeof tenant;
