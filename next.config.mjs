/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // Use system TLS certs (fixes font fetch / proxy TLS errors)
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
