/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',

  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
