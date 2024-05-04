/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "media.discordapp.net",
        port: "",
        pathname: "/*/**"
      }
    ]
  }
};

export default nextConfig;
