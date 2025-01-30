/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
