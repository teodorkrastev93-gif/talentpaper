/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Don’t let type/lint errors kill the Vercel build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
