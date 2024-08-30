/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_SERVER_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
