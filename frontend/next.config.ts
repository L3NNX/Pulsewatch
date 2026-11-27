import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // On Vercel: rewrites are handled by vercel.json (this block is ignored)
    // Locally: proxies /api/* to the Express backend
    const backendUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      'http://localhost:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
