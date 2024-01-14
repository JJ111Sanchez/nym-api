/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nymtech.net',
      
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      
      },
    ],
  },
}

module.exports = nextConfig;


