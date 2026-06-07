import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true, 
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i19lrgwsvc.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
} as any;

export default nextConfig;
