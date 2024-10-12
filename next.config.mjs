/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ipfs.io", "ipfs.jpg", "res.cloudinary.com"], // Add the IPFS gateway domain here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "ipfs",
        pathname: "**", // This allows any hostname for ipfs
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;