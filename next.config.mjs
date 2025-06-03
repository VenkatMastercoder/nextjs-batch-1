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
    domains: ['cdn.dummyjson.com',"lh3.googleusercontent.com"],
  },
};

export default nextConfig;
