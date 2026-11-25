import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'PulseWatch | Know Before Your Users Do',
  description:
    'High-precision uptime monitoring with automated AI postmortems and public status pages for modern SaaS teams.',
  keywords: ['uptime monitoring', 'status page', 'incident management', 'health checks'],
  authors: [{ name: 'PulseWatch' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
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
