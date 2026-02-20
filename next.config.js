/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'hayatleather.com',
      },
      {
        protocol: 'http',
        hostname: 'hayatleather.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
      },
      {
        protocol: 'https',
        hostname: 'hfy-factsheet-projects.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'newprojects.99acres.com',
      },
      {
        protocol: 'https',
        hostname: 'img.staticmb.com',
      },
    ],

  },
}

module.exports = nextConfig
