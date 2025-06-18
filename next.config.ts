/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other configurations might be here
  
  // Add this 'images' block
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**', // Allows any path on this hostname
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google user avatars
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;