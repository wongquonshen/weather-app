/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media1.tenor.com',
            port: '',
            pathname: '/m/**',
          },
          {
            protocol: 'https',
            hostname: 'openweathermap.org',
            port: '',
            pathname: '/img/**',
          },
        ],
      },
};

export default nextConfig;
