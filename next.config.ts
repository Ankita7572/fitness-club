/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
    headers: async () => {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
    ]
  },

  // Redirect old robots.txt paths if needed
  redirects: async () => {
    return [
      {
        source: '/robots', // Handle requests without .txt extension
        destination: '/robots.txt',
        permanent: true,
      },
    ]
  },

  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
