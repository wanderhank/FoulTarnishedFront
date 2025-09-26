/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },

    async rewrites() {
        return [
            {
                source: "/api/login",
                destination: "http://localhost:5000/login",
            },
            {
                source: "/api/signin",
                destination: "http://localhost:5000/admins",
            },
            {
                source: "/api/admins/:id",
                destination: "http://localhost:5000/admins/:id",
            },
            {
                source: "/api/weapons",
                destination: "http://localhost:5000/weapons",
            },
        ];
    },
};

export default nextConfig;