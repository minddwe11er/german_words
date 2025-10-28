/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // Для Google профілів
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
