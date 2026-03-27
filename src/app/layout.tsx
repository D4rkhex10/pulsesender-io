import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { getTenant } from '@/lib/tenant';
import './globals.css';

const t = getTenant();

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Antonio:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
