import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';

const appUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'PulseWatch | Know Before Your Users Do',
  description:
    'High-precision uptime monitoring with automated AI postmortems and public status pages for modern SaaS teams.',
  keywords: ['uptime monitoring', 'status page', 'incident management', 'health checks'],
  authors: [{ name: 'PulseWatch' }],
  metadataBase: new URL(appUrl),
  openGraph: {
    title: 'PulseWatch | Know Before Your Users Do',
    description: 'Stop relying on angry customer tweets. PulseWatch executes high-precision health checks and writes AI incident postmortems in 2 seconds.',
    siteName: 'PulseWatch',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PulseWatch | Know Before Your Users Do',
    description: 'High-precision uptime monitoring with zero alert flapping.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#171e19] font-satoshi antialiased selection:bg-[#ffe17c] selection:text-[#171e19]">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
