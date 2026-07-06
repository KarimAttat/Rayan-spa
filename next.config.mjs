/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Quando aggiungerai foto reali in /public/images potrai eventualmente
    // servirle anche da un CDN: aggiungi qui i domini remoti.
    remotePatterns: [],
  },
};

export default nextConfig;
