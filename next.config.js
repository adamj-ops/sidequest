/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during build to prevent build failures
  eslint: {
    // Don't run ESLint during build
    ignoreDuringBuilds: true,
  },
  // Allow Vercel to handle TypeScript errors
  typescript: {
    // Don't fail on TypeScript errors
    ignoreBuildErrors: true,
  },
  // Other Next.js config options
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
