import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['localhost', '192.168.207.136'],
  // generateBuildId: async () => {
  //   // This could be anything, using the latest git hash
  //   return process.env.GIT_HASH
  // },
  reactStrictMode: true,
};

export default nextConfig;