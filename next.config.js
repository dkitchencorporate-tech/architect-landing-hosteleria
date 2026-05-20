/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Habilitar compilación estricta: no ignorar errores de TS en build
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
