/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
