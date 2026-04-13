/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/fitness',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
