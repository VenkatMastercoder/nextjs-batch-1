/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/contact",
        permanent: true, // 308
      },
      {
        source:"/legacy-dashboard",
        destination:"/dashboard",
        permanent: false // 307
      }
    ];
  },
  images: {
    domains: ['cdn.dummyjson.com'],
  },
};

export default nextConfig;
