import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['google-auth-library'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false,
      fs: false,
      os: false,
      net: false,
      tls: false,
      dns: false,
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;