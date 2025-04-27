/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // <-- Ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // <-- Ignore ESLint errors during build
  },
};

export default nextConfig;
