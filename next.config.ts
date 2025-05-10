import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['google-auth-library'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false,
      fs: false,
      os: false,
    };
    return config;
  },
};

export default nextConfig;